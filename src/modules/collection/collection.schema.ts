import { z } from 'zod';

export const addItemSchema = z.object({
  cardId: z.number().min(1, 'El cardId no es válido'),
  quantity: z.number().min(1, 'La cantidad mínima es 1'),
  condition: z.string().min(1, 'El estado es obligatorio'),
});

export const updateItemSchema = z.object({
  quantity: z.number().min(1, 'La cantidad mínima es 1').optional(),
  condition: z.string().min(1, 'El estado es obligatorio').optional(),
});

export type AddItemInput = z.infer<typeof addItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;