// Imports
// ========================================================
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { buildErrorResponse } from '../utils/helpers';

// Middleware
// ========================================================
const Validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(buildErrorResponse(errors.array()));
  }
  next();
};

// Exports
// ========================================================
export default Validator;
