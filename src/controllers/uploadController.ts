import { FastifyRequest, FastifyReply } from 'fastify';
import { MultipartFile } from '@fastify/multipart';
import { saveFile, FileUploadResult } from '../utils/fileHandler';

/**
 * Handler for file upload
 */
export const uploadFileHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const data = await request.file();
    
    if (!data) {
      return reply.status(400).send({ error: 'No file provided' });
    }

    const fileInfo: FileUploadResult = await saveFile(data);
    
    return reply.status(201).send({
      success: true,
      file: {
        ...fileInfo,
        url: `${request.protocol}://${request.hostname}/f/${fileInfo.filename}`
      }
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ 
      error: 'File upload failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};