// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { buildSuccessResponse, verifyMerkleProof } from '../../utils/helpers';
import { QUERY_WALLETS_ALL } from '../wallets/queries';
import Validator from '../../middlewares/validator';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const VerifyMerkle = async (req: Request, res: Response) => {
  const wallets = await QUERY_WALLETS_ALL();

  const verify = verifyMerkleProof(
    wallets.map((i: any) => i.address),
    req.body.proof,
    req.body.address,
    req.body.root,
  );

  return res.json(
    buildSuccessResponse({
      isValid: verify,
    }),
  );
};

// Middlewares
// ========================================================
router.post(
  '/verify',
  body('proof').isArray(),
  body('address').isString().isLength({ min: 2 }),
  body('root').isString(),
  Validator,
  VerifyMerkle,
);

// Exports
// ========================================================
export default router;
