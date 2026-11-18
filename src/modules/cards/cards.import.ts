import { prisma } from '../../config/db.js';
import { fetchCard, fetchSet, type TcgdexCard } from './tcgdex.client.js';

const BATCH_SIZE = 10;

export function toCardData(card: TcgdexCard) {
  return {
    externalId: card.id,
    name: card.name,
    setName: card.set.name,
    number: String(card.localId),
    rarity: card.rarity ?? null,
    imageUrl: card.image ? `${card.image}/high.png` : null,
  };
}

export async function importSet(setId: string) {
  const set = await fetchSet(setId);
  let saved = 0;

  for (let i = 0; i < set.cards.length; i += BATCH_SIZE) {
    const batch = set.cards.slice(i, i + BATCH_SIZE);
    const cards = await Promise.all(batch.map((brief) => fetchCard(brief.id)));

    for (const card of cards) {
      const data = toCardData(card);
      await prisma.card.upsert({
        where: { externalId: data.externalId },
        update: data,
        create: data,
      });
      saved++;
    }
  }

  return { setName: set.name, saved };
}