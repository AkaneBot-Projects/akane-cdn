import { FastifyRequest, FastifyReply } from 'fastify';
import { File } from '../models/File';
import { request as undiciRequest } from 'undici';

interface FileParams {
  id: string;
}

export const getFileHandler = async (
  request: FastifyRequest<{ Params: FileParams }>,
  reply: FastifyReply
) => {
  const { id } = request.params;

  try {
    const fileRecord = await File.findOne({ customId: id });

    if (!fileRecord) {
      return reply.status(404).send({ error: 'File not found' });
    }
    
    const externalResponse = await undiciRequest(fileRecord.imagekitUrl);
    
    for (const [key, value] of Object.entries(externalResponse.headers)) {
      if (key.toLowerCase() === 'content-length' || key.toLowerCase() === 'content-type') {
        reply.header(key, value);
      }
    }
    
    return reply.send(externalResponse.body);
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Failed to fetch file' });
  }
};

export const getFileInfoHandler = async (
  request: FastifyRequest<{ Params: FileParams }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  
  try {
    const fileRecord = await File.findOne({ customId: id });
    
    if (!fileRecord) {
      return reply.status(404).send({ error: 'File not found' });
    }
    
    const customDomain = process.env.CUSTOM_DOMAIN || 'https://c.termai.cc';
    
    return reply.status(200).send({
      success: true,
      file: {
        id: fileRecord.customId,
        filename: fileRecord.filename,
        originalFilename: fileRecord.originalFilename,
        mimetype: fileRecord.mimetype,
        size: fileRecord.size,
        url: `${customDomain}/${fileRecord.customId}`,
        directUrl: fileRecord.imagekitUrl,
        uploadedAt: fileRecord.uploadedAt
      }
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(404).send({ error: 'File not found' });
  }
};

// List all files
export const listFilesHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const page = parseInt((request.query as any).page) || 1;
    const limit = parseInt((request.query as any).limit) || 10;
    const skip = (page - 1) * limit;
    
    const files = await File.find()
      .sort({ uploadedAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await File.countDocuments();
    const customDomain = process.env.CUSTOM_DOMAIN || 'https://c.termai.cc';
    
    const fileList = files.map(file => ({
      id: file.customId,
      filename: file.filename,
      originalFilename: file.originalFilename,
      mimetype: file.mimetype,
      size: file.size,
      url: `${customDomain}/${file.customId}`,
      directUrl: file.imagekitUrl,
      uploadedAt: file.uploadedAt
    }));
    
    return reply.status(200).send({
      success: true,
      files: fileList,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Failed to fetch files' });
  }
};