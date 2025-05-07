import { FastifyRequest, FastifyReply } from 'fastify';
import { config } from 'dotenv';

// Ensure environment variables are loaded
config();

/**
 * Middleware for validating authentication token
 */
export const validateToken = async (request: FastifyRequest, reply: FastifyReply) => {
  const secretToken = process.env.SECRET_TOKEN;
  
  if (!secretToken) {
    request.log.error('SECRET_TOKEN is not set in environment variables');
    return reply.status(500).send({ error: 'Server configuration error' });
  }

  const authHeader = request.headers.authorization;
  
  if (!authHeader) {
    return reply.status(401).send({ error: 'Authorization header is required' });
  }

  // Check if it's a Bearer token
  const parts = authHeader.split(' ');
  const token = parts.length === 2 && parts[0] === 'Bearer' ? parts[1] : authHeader;

  if (token !== secretToken) {
    return reply.status(403).send({ error: 'Invalid token' });
  }
}; 