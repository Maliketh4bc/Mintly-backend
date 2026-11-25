import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { addItemSchema, updateItemSchema } from './collection.schema.js';
import { listCollectionCtrl, addItemCtrl, updateItemCtrl, deleteItemCtrl } from './collection.controller.js';

const router = Router();

router.get('/', auth, listCollectionCtrl);
router.post('/', auth, validate(addItemSchema), addItemCtrl);
router.patch('/:id', auth, validate(updateItemSchema), updateItemCtrl);
router.delete('/:id', auth, deleteItemCtrl);

export default router;