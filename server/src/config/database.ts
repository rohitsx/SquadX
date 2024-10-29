import { PrismaClient as PrismaClient1 } from '../../prisma/generated/client1'
import { PrismaClient as PrismaClient2 } from '../../prisma/generated/client2'

const psqlClient  = new PrismaClient1();
const mongoClient = new PrismaClient2();

export {psqlClient, mongoClient};
