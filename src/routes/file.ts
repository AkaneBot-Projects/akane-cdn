import { FastifyPluginAsync } from 'fastify';
import { getFileHandler, getFileInfoHandler, listFilesHandler } from '../controllers/fileController';

const fileRoutes: FastifyPluginAsync = async (fastify, options) => {
  // Serve file by custom ID
  fastify.route({
    method: 'GET',
    url: '/:id',
    handler: getFileHandler,
  });
  
  // Get file info by custom ID
  fastify.route({
    method: 'GET',
    url: '/info/:id',
    handler: getFileInfoHandler,
  });
  
  // List all files
  fastify.route({
    method: 'GET',
    url: '/list',
    handler: listFilesHandler,
  });
};

export default fileRoutes; 