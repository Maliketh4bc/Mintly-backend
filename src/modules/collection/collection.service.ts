import { prisma } from '../../config/db.js';
import { cardSelect } from '../cards/cards.service.js';

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
