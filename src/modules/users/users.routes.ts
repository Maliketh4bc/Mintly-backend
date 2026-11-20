import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { updateUserSchema } from './users.schema.js';
import { listUsersCtrl, getUserCtrl, meCtrl, updateUserCtrl, deleteUserCtrl } from './users.controller.js';

const router = Router();

router.get('/', listUsersCtrl);
router.get('/me', auth, meCtrl);
router.get('/:id', getUserCtrl);
router.patch('/:id', validate(updateUserSchema), updateUserCtrl);
router.delete('/:id', deleteUserCtrl);

export default router;
