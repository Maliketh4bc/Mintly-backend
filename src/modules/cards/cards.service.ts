import { prisma } from '../../config/db.js';

const cardSelect = {
    id: true,
    externalId: true,
    name: true,
    setName: true,
    number: true,
    rarity: true,
    imageUrl: true,
    marketPrice: true,
    priceUpdatedAt: true
};

export async function findCardById(id: number) {
    return prisma.card.findUnique({
        where: { id },
        select: cardSelect,
    });
}

export async function listCards(q?: string) {
    return prisma.card.findMany({
        where: q ? { name: { contains: q, mode: 'insensitive' } } : undefined,
        select: cardSelect,
        orderBy: { name: 'asc' },
    });
}