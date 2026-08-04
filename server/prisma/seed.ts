import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { hashPassword } from '../src/utils/password';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const patients = [
  {
    fullName: 'Alex Thompson',
    email: 'patient@healthsphere.ai',
    mobile: '9876543210',
    password: 'patient123',
    isVerified: true,
  },
];

const doctors = [
  {
    fullName: 'Dr. Julianne Smith',
    email: 'doctor@healthsphere.ai',
    mobile: '9876543211',
    healthId: '10-1234-5678-9012',
    password: 'doctor123',
    isVerified: true,
  },
];

const owners = [
  {
    fullName: 'Sarah Mitchell',
    email: 'admin@healthsphere.ai',
    mobile: '9876543212',
    password: 'admin123',
    isVerified: true,
  },
];

async function seedTable(model: keyof Pick<PrismaClient, 'patient' | 'doctor' | 'owner'>, rows: typeof patients) {
  for (const row of rows) {
    const hashed = await hashPassword(row.password);
    const data = { ...row, password: hashed };
    await (prisma[model] as any).upsert({
      where: { email: row.email },
      update: data,
      create: data,
    });
  }
}

async function main() {
  await seedTable('patient', patients);
  await seedTable('doctor', doctors);
  await seedTable('owner', owners);

  const patientCount = await prisma.patient.count();
  const doctorCount = await prisma.doctor.count();
  const ownerCount = await prisma.owner.count();
  console.log(`Seed complete. ${patientCount} patient(s), ${doctorCount} doctor(s), ${ownerCount} owner(s) in the database.`);
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
