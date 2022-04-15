// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { buildSuccessResponse } from '../../utils/helpers';
import { CREATE_WALLET } from './queries';
import Validator from '../../middlewares/validator';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const CreateWallet = async (req: Request, res: Response) => {
  const { data } = await CREATE_WALLET(req.body);

  return res.json(buildSuccessResponse(data));
};

// Middlewares
// ========================================================
router.post(
  '/',
  body('address').isString().isLength({ min: 2 }),
  Validator,
  CreateWallet,
);

// Exports
// ========================================================
export default router;
