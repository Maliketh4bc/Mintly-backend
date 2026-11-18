import type { Request, Response } from 'express';
import { searchCardsSchema } from './cards.schema.js';
import { listCards, findCardById } from './cards.service.js';

export async function listCardsCtrl(req: Request, res: Response) {
    try {
        const parsed = searchCardsSchema.safeParse(req.query);
        if (!parsed.success) {
            return res.status(400).json({ errors: parsed.error.flatten() });
        }
        const cards = await listCards(parsed.data.q);
        res.json(cards.map((card) => ({ ...card, marketPrice: card.marketPrice?.toNumber() ?? null })));
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export async function getCardCtrl(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const card = await findCardById(id);
        if (!card) {
            return res.status(404).json({ message: 'Carta no encontrada' });
        }
        res.json({ ...card, marketPrice: card.marketPrice?.toNumber() ?? null });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}