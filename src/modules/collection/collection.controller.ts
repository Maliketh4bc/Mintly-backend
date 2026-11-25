import type { Request, Response } from 'express';
import { listCollection, addItem, updateItem, deleteItem } from './collection.service.js';

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

export async function addItemCtrl(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const item = await addItem(req.user.sub, req.body);
    res.status(201).json(toCollectionItemResponse(item));
  } catch (error: any) {
    if (error.code === 'P2003') {
      return res.status(400).json({ message: 'La carta no existe' });
    }
    res.status(500).json({ message: error.message });
  }
}

export async function updateItemCtrl(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const item = await updateItem(id, req.user.sub, req.body);
    if (!item) {
      return res.status(404).json({ message: 'Carta no encontrada en tu colección' });
    }

    res.json(toCollectionItemResponse(item));
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Ya tienes esa carta en ese estado' });
    }
    res.status(500).json({ message: error.message });
  }
}

export async function deleteItemCtrl(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const deleted = await deleteItem(id, req.user.sub);
    if (!deleted) {
      return res.status(404).json({ message: 'Carta no encontrada en tu colección' });
    }

    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
