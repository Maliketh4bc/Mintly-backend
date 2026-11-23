import type { Request, Response } from 'express';
import { listCollection } from './collection.service.js';

type CollectionItemRow = Awaited<ReturnType<typeof listCollection>>[number];

export function toCollectionItemResponse(item: CollectionItemRow) {
  return {
    ...item,
    card: { ...item.card, marketPrice: item.card.marketPrice?.toNumber() ?? null },
  };
}

export async function listCollectionCtrl(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const items = await listCollection(req.user.sub);
    res.json(items.map(toCollectionItemResponse));
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
