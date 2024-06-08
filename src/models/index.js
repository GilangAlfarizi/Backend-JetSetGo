const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  users: prisma.users,
  profiles: prisma.profiles,
  orders: prisma.orders,
  passengers: prisma.passengers,
  flights: prisma.flights,
  classes: prisma.classes,
  tickets: prisma.tickets
};
