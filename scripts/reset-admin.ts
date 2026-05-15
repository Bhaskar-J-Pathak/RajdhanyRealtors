/**
 * One-time script to create or reset the admin user.
 * Run with: DATABASE_URL="<prod-url>" npx tsx scripts/reset-admin.ts
 *
 * Set ADMIN_USERNAME and ADMIN_PASSWORD env vars to override defaults.
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "admin123";

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.admin.upsert({
    where: { username },
    update: { passwordHash },
    create: { username, passwordHash },
  });

  console.log(`Admin user ready: ${admin.username}`);
  console.log(`Password set to: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
