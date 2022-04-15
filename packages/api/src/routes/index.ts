// Imports
// ========================================================
import { Router } from 'express';
import Merkle from './merkle';
import Wallets from './wallets';

// Config
// ========================================================
const router = Router();

// Routes
// ========================================================
router.use('/merkle', Merkle);
router.use('/wallets', Wallets);

// Exports
// ========================================================
export default router;
