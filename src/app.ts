import fastify, { FastifyInstance } from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import fastifyCors from '@fastify/cors';
import uploadRoutes from './routes/upload';
import fileRoutes from './routes/file';
import config from './config/env';
import { connectDatabase } from './config/database';

export const buildApp = async (): Promise<FastifyInstance> => {
  // Connect to database
  await connectDatabase();
  
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

  // Register routes
  app.register(uploadRoutes);
  app.register(fileRoutes); 

  // Add a root route for health check
  app.get('/', async (request, reply) => {
    reply.code(200).send({ 
      status: 'OK', 
      message: 'Akane CDN with is running',
      domain: process.env.CUSTOM_DOMAIN || 'https://cdn.akane.web.id'
    });
  });

  // Handle 404 errors
  app.setNotFoundHandler((request, reply) => {
    reply.code(404).send({ success: false, message: 'File not found' });
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
};