import fastify, { FastifyInstance } from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import path from 'path';
import uploadRoutes from './routes/upload';
import fileRoutes from './routes/file';
import config from './config/env';

/**
 * Build the Fastify application with all plugins and routes
 * @returns Configured Fastify instance
 */
export const buildApp = (): FastifyInstance => {
  const app = fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'info',
    },
    trustProxy: true
  });

  // Register plugins
  app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  });

  // Register fastifyMultipart plugin with a unique name to avoid conflicts
  /*
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 100 * 1024 * 1024 // 100MB upload limit
    },
    attachFieldsToBody: true
  }, { name: 'mainMultipart' }); // Add a unique name to prevent duplicate registration
*/

  app.register(fastifyStatic, {
    root: config.uploadDir,
    prefix: '/files/', // An alternative way to serve files
    decorateReply: false
  });

  // Register routes
  app.register(uploadRoutes, { prefix: '/upload' }); // Add prefixes to better organize routes
  app.register(fileRoutes, { prefix: '/file' });

  // Add a root route for health check
  app.get('/', async (request, reply) => {
    reply.code(200).send({ status: 'OK', message: 'File server is running' });
  });

  // Handle 404 errors
  app.setNotFoundHandler((request, reply) => {
    reply.code(404).send({ success: false, message: 'Route not found' });
  });

  // Handle server errors
  app.setErrorHandler((error, request, reply) => {
    console.error(`Server error: ${error}`);
    reply.code(500).send({
      success: false,
      message: 'Internal server error'
    });
  });

  return app;
}