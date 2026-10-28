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
  fastify.addHook('preHandler', requireAuth);

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

    const ALLOWED = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.webp': 'image/webp',
      '.gif': 'image/gif',
    } as Record<string, string>;

    const extCheck = path.extname(data.filename || '').toLowerCase();
    if (!ALLOWED[extCheck] || data.mimetype !== ALLOWED[extCheck]) {
      throw new AppError({
        code: 'BAD_REQUEST',
        message: 'Only JPG, PNG, WEBP, and GIF images are allowed. SVG and executable/document formats are strictly prohibited.',
        statusCode: 400,
      });
    }

    const buffer = await data.toBuffer();

    // Enforce 15MB file size limit
    const MAX_SIZE = 15 * 1024 * 1024;
    if (buffer.length > MAX_SIZE) {
      throw new AppError({
        code: 'BAD_REQUEST',
        message: 'File size exceeds maximum allowed limit of 15MB',
        statusCode: 400,
      });
    }

    // Verify true file signature (magic bytes) to prevent spoofed/renamed files
    const isJpeg = data.mimetype === 'image/jpeg' && buffer.length > 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
    const isPng = data.mimetype === 'image/png' && buffer.length > 8 && buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47;
    const isGif = data.mimetype === 'image/gif' && buffer.length > 6 && buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x38;
    const isWebp = data.mimetype === 'image/webp' && buffer.length > 12 && buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 && buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50;

    if (!isJpeg && !isPng && !isGif && !isWebp) {
      throw new AppError({
        code: 'BAD_REQUEST',
        message: 'Invalid image signature. The file content does not match its claimed image format.',
        statusCode: 400,
      });
    }

    const hash = crypto.createHash('md5').update(buffer).digest('hex');
    const ext = extCheck;
    const baseFilename = `${hash}-${Date.now()}`;
    const mainFileName = `${baseFilename}${ext}`;
    const mainFilePath = path.join(env.UPLOADS_DIR, mainFileName);

    await fs.writeFile(mainFilePath, buffer);

    let width = 0;
    let height = 0;
    let blurhashStr: string | null = null;
    const variants: Record<string, any> = {};

    // Process image with Sharp
    try {
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
    } catch (err: any) {
      request.log.warn({ err }, 'Sharp image processing warning');
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
