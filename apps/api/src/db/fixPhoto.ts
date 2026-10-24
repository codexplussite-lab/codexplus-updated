import { db } from './index.js';
import { teamMembers } from './schema.js';
import { eq } from 'drizzle-orm';

async function fix() {
  await db
    .update(teamMembers)
    .set({
      socials: {
        photoUrl: '/uploads/1792651682911-15d8943574d61c03a03331389680b8a11c7a92bd-747x1024.webp',
      },
    })
    .where(eq(teamMembers.name, 'Syed Raza Abbas Jaffery'));

  console.log('Fixed photoUrl path!');
  process.exit(0);
}

fix().catch((err) => {
  console.error(err);
  process.exit(1);
});
