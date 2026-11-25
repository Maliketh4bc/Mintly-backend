import { prisma } from '../../config/db.js';
import { cardSelect } from '../cards/cards.service.js';
import type { CardCondition } from '@prisma/client';

export const collectionItemSelect = {
  id: true,
  quantity: true,
  condition: true,
  addedAt: true,
  card: { select: cardSelect },
};

export async function listCollection(userId: number) {
  return prisma.collectionItem.findMany({
    where: { userId },
    select: collectionItemSelect,
    orderBy: { addedAt: 'desc' },
  });
}

export async function addItem(userId: number, data: { cardId: number; quantity: number; condition: CardCondition }) {
  const existing = await prisma.collectionItem.findFirst({
    where: { userId, cardId: data.cardId, condition: data.condition },
  });

  if (existing) {
    return prisma.collectionItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + data.quantity },
      select: collectionItemSelect,
    });
  }

  return prisma.collectionItem.create({
    data: { userId, cardId: data.cardId, quantity: data.quantity, condition: data.condition },
    select: collectionItemSelect,
  });
}

export async function updateItem(id: number, userId: number, data: { quantity?: number; condition?: CardCondition }) {
  const item = await prisma.collectionItem.findFirst({
    where: { id, userId },
  });

  if (!item) {
    return null;
  }

  return prisma.collectionItem.update({
    where: { id },
    data,
    select: collectionItemSelect,
  });
}

export async function deleteItem(id: number, userId: number) {
  const item = await prisma.collectionItem.findFirst({
    where: { id, userId },
  });

  if (!item) {
    return false;
  }

  await prisma.collectionItem.delete({
    where: { id },
  });

  return true;
}
