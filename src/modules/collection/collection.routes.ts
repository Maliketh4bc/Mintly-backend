import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { listCollectionCtrl } from './collection.controller.js';

const router = Router();

router.use(auth);

router.get('/', listCollectionCtrl);

export default router;
