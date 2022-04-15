// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { param } from 'express-validator';
import { buildSuccessResponse } from '../../utils/helpers';
import { DELETE_WALLET } from './queries';
import Validator from '../../middlewares/validator';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const DeleteWalelt = async (req: Request, res: Response) => {
  const { data } = await DELETE_WALLET(req.params.id);

  return res.json(buildSuccessResponse(data));
};

// Middlewares
// ========================================================
router.delete('/:id', param('id').isUUID(), Validator, DeleteWalelt);

// Exports
// ========================================================
export default router;
