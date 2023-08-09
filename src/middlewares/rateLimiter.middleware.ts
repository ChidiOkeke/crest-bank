import rateLimit from 'express-rate-limit';
import { rateLimitMaxRequests, rateLimitMilliseconds } from '../constants/constants';
import { responses, status } from '../utils/messages.util';


export const rateLimiter = rateLimit({
  windowMs: rateLimitMilliseconds, 
  max: rateLimitMaxRequests,
  message: {
    success: status.failed,
    message: responses.rateLimitExceeded
  }, 
  standardHeaders: true,
  legacyHeaders: false,
});