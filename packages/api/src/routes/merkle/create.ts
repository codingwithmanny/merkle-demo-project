// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { buildSuccessResponse, generateMerkleTree } from '../../utils/helpers';
import { QUERY_WALLETS_ALL } from '../wallets/queries';
import Validator from '../../middlewares/validator';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const CreateMerkle = async (req: Request, res: Response) => {
  const wallets = await QUERY_WALLETS_ALL();

  const { tree, root, proof } = generateMerkleTree(
    wallets.map((i: any) => i.address),
    req.body.address,
  );

  return res.json(buildSuccessResponse({ tree, root, proof }));
};

// Middlewares
// ========================================================
router.post(
  '/',
  body('address').isString().isLength({ min: 2 }),
  Validator,
  CreateMerkle,
);

// Exports
// ========================================================
export default router;
