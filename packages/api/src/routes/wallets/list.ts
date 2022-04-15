// Imports
// ========================================================
import { Router, Request, Response } from 'express';
import { buildSuccessResponse } from '../../utils/helpers';
import { QUERY_WALLETS } from './queries';

// Config
// ========================================================
const router = Router();

// Route
// ========================================================
const ListWallets = async (req: Request, res: Response) => {
  const { data, pagination } = await QUERY_WALLETS({
    query: req?.query?.q as string | undefined,
    take: req?.query?.take
      ? (parseInt(req.query.take as string, 0) as number)
      : undefined,
    skip: req?.query?.skip
      ? (parseInt(req.query.skip as string, 0) as number)
      : undefined,
    orderBy: req?.query?.orderBy as string | undefined,
    sort: req?.query?.sort as string | undefined,
  });
  return res.json(buildSuccessResponse(data, pagination));
};

// Middlewares
// ========================================================
router.get('/', ListWallets);

// Exports
// ========================================================
export default router;
