// Imports
// ========================================================
import { Router } from 'express';
import CreateMerkle from './create';
import VerifyMerkle from './verify';

// Config
// ========================================================
const router = Router();

// Routes
// ========================================================
router.use(CreateMerkle);
router.use(VerifyMerkle);

// Exports
// ========================================================
export default router;
