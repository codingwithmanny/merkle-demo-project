// Imports
// ========================================================
import dotenv from 'dotenv';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

// Config
// ========================================================
dotenv.config();

// Middleware
// ========================================================
const CheckJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: `${process.env.AUTH0_AUDIENCE}`,
  issuer: [`https://${process.env.AUTH0_DOMAIN}/`],
  algorithms: ['RS256'],
});

// Exports
// ========================================================
export default CheckJwt;
