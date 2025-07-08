import { FastifyPluginAsync } from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import { uploadFileHandler } from '../controllers/uploadController';
import { validateToken } from '../utils/tokenChecker';

const uploadRoutes: FastifyPluginAsync = async (fastify, options) => {
  fastify.register(fastifyMultipart, {
    limits: {
      fileSize: 100 * 1024 * 1024, // 100MB file size limit
    },
  });
  
  fastify.route({
    method: 'POST',
    url: '/upload',
    preHandler: validateToken,
    handler: uploadFileHandler,
  });
};

export default uploadRoutes;