import { PrismaClient } from '@prisma/client';

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(); // Create a new instance for production
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient(); // Use a global instance for development
  }
  prisma = global.prisma;
}

export default prisma;
