import { FastifyRequest, FastifyReply } from 'fastify';
import fs from 'fs';
import path from 'path';
import { fileExists, getFilePath } from '../utils/fileHandler';
import mime from 'mime-types';

interface FileParams {
  filename: string;
}

/**
 * Handler for serving files
 */
export const getFileHandler = async (
  request: FastifyRequest<{ Params: FileParams }>,
  reply: FastifyReply
) => {
  const { filename } = request.params;
  
  // Validate filename to prevent directory traversal
  if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return reply.status(400).send({ error: 'Invalid filename' });
  }

  // Check if file exists
  if (!fileExists(filename)) {
    return reply.status(404).send({ error: 'File not found' });
  }

  const filePath = getFilePath(filename);
  
  // Determine MIME type
  const mimeType = mime.lookup(filePath) || 'application/octet-stream';
  
  // Serve the file
  return reply
    .type(mimeType)
    .send(fs.createReadStream(filePath));
};