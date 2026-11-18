import { z } from 'zod';

export const searchCardsSchema = z.object({
  q: z.string().trim().min(1, 'La búsqueda no puede estar vacía').optional(),
});