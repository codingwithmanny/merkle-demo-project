// Imports
// ========================================================
import { Router } from 'express';
import ListWallets from './list';
import CreateWallet from './create';
import DeleteWallet from './delete';

// Config
// ========================================================
const router = Router();

// Routes
// ========================================================
router.use(ListWallets);
router.use(CreateWallet);
router.use(DeleteWallet);

// Exports
// ========================================================
export default router;
