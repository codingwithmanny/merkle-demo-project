// Imports
// ========================================================
import { PrismaClient, User } from '@prisma/client';
import faker from 'faker';

// Config
// ========================================================
const prisma = new PrismaClient();
const NUMBER_TO_GENERATE = 10;

// Main Seeder
// ========================================================
const main = async () => {
  // Users
  const CREATED_USERS: User[] = [];

  for (let i = 0; i < NUMBER_TO_GENERATE; i++) {
    CREATED_USERS.push(
      await prisma.user.create({
        data: {
          firstName: faker.fake(`{{name.firstName}}`),
          lastName: faker.fake(`{{name.firstName}}`),
          email: faker.internet.email(),
        },
      }),
    );
  }

  CREATED_USERS.push(
    await prisma.user.create({
      data: {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@example.com',
      },
    }),
  );

  console.group('Users Seeding:');
  console.log(`Created: ${CREATED_USERS.length}`);
  console.groupEnd();
};

// Init
// ========================================================
main()
  .catch((e) => {
    console.log(e);
    process.exit();
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
