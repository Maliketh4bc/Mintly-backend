import { Router } from 'express';
import { listCardsCtrl, getCardCtrl } from './cards.controller.js';

const router = Router();

router.get('/', listCardsCtrl);
router.get('/:id', getCardCtrl);

export default router;