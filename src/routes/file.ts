import { FastifyPluginAsync } from 'fastify';
import { getFileHandler } from '../controllers/fileController';

const fileRoutes: FastifyPluginAsync = async (fastify, options) => {
  // Public access to files
  fastify.route({
    method: 'GET',
    url: '/f/:filename',
    handler: getFileHandler,
  });
};

export default fileRoutes;