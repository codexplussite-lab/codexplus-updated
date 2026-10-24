import { FastifyInstance } from 'fastify';
import multipart from '@fastify/multipart';
import { db } from '../db/index.js';
import { media } from '../db/schema.js';
import { requireAuth, requireCsrf } from '../middleware/auth.js';
import { AppError } from '../plugins/error-handler.js';
import { env } from '../config/env.js';
import sharp from 'sharp';
import { encode } from 'blurhash';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { eq, desc } from 'drizzle-orm';

export async function mediaRoutes(fastify: FastifyInstance) {
  await fastify.register(multipart, {
    limits: {
      fileSize: 15 * 1024 * 1024, // 15MB max
    },
  });

  // Ensure uploads directory exists
  await fs.mkdir(env.UPLOADS_DIR, { recursive: true });

  // List Media
  fastify.get('/', async (request, reply) => {
    const items = await db.select().from(media).orderBy(desc(media.createdAt));
    return reply.send({ items });
  });

  // Upload Media
  fastify.post('/upload', async (request, reply) => {
    const data = await request.file();
    if (!data) {
      throw new AppError({ code: 'BAD_REQUEST', message: 'No file uploaded', statusCode: 400 });
    }

    const buffer = await data.toBuffer();
    const hash = crypto.createHash('md5').update(buffer).digest('hex');
    const ext = path.extname(data.filename) || '.jpg';
    const baseFilename = `${hash}-${Date.now()}`;
    const mainFileName = `${baseFilename}${ext}`;
    const mainFilePath = path.join(env.UPLOADS_DIR, mainFileName);

    await fs.writeFile(mainFilePath, buffer);

    let width = 0;
    let height = 0;
    let blurhashStr: string | null = null;
    const variants: Record<string, any> = {};

    // Process image with Sharp if applicable
    if (data.mimetype.startsWith('image/') && !data.mimetype.includes('svg')) {
      const metadata = await sharp(buffer).metadata();
      width = metadata.width || 0;
      height = metadata.height || 0;

      // Blurhash computation
      try {
        const { data: rawData, info } = await sharp(buffer)
          .raw()
          .ensureAlpha()
          .resize(32, 32, { fit: 'inside' })
          .toBuffer({ resolveWithObject: true });
        blurhashStr = encode(new Uint8ClampedArray(rawData), info.width, info.height, 4, 4);
      } catch (err: any) {
        request.log.warn({ err }, 'Could not generate blurhash');
      }

      // Generate WebP variants (400, 800, 1600)
      for (const w of [400, 800, 1600]) {
        if (width >= w) {
          const variantName = `${baseFilename}-${w}.webp`;
          const variantPath = path.join(env.UPLOADS_DIR, variantName);
          const resized = await sharp(buffer).resize(w).webp({ quality: 80 }).toFile(variantPath);

          variants[`webp_${w}`] = {
            width: resized.width,
            height: resized.height,
            size: resized.size,
            url: `${env.MEDIA_BASE_URL}/${variantName}`,
            format: 'webp',
          };
        }
      }
    }

    const [saved] = await db
      .insert(media)
      .values({
        filename: data.filename,
        mime: data.mimetype,
        size: buffer.length,
        width,
        height,
        blurhash: blurhashStr,
        alt: data.fields?.alt ? (data.fields.alt as any).value : '',
        folder: data.fields?.folder ? (data.fields.folder as any).value : 'general',
        variants,
        uploadedBy: request.user?.id,
      })
      .returning();

    return reply.status(201).send(saved);
  });
}
