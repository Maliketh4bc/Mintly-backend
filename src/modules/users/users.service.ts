import { prisma } from '../../config/db.js';

// Campos que se devuelven de un usuario: nunca el passwordHash
const userSelect = { id: true, email: true, username: true, elo: true, createdAt: true };

export async function listUsers() {
  return prisma.user.findMany({
    select: userSelect,
    orderBy: { id: 'asc' },
  });
}

export async function findUserById(id: number) {
  return prisma.user.findUnique({
    where: { id },
    select: userSelect,
  });
}

export async function updateUser(id: number, data: { email?: string; username?: string }) {
  return prisma.user.update({
    where: { id },
    data,
    select: userSelect,
  });
}

export async function deleteUser(id: number) {
  return prisma.user.delete({ where: { id } });
}
