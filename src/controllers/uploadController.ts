import { FastifyRequest, FastifyReply } from 'fastify';
import { uploadToImageKit, ImageKitUploadResult } from '../utils/imagekitHandler';
import { generateUniqueFilename } from '../utils/fileHandler';
import { generateCustomId } from '../utils/idGenerator';
import { File } from '../models/File';

export const uploadFileHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const data = await request.file();
    
    if (!data) {
      return reply.status(400).send({ error: 'No file provided' });
    }

    // Convert file stream to buffer
    const fileBuffer = await data.toBuffer();
    
    // Generate unique filename
    const uniqueFilename = generateUniqueFilename(data.filename);
    
    // Upload to ImageKit
    const uploadResult: ImageKitUploadResult = await uploadToImageKit(
      fileBuffer,
      uniqueFilename,
      data.filename
    );
    
    // Generate custom ID
    const customId = generateCustomId();
    
    // Save to database
    const fileRecord = new File({
      customId,
      filename: uploadResult.name,
      originalFilename: data.filename,
      mimetype: uploadResult.fileType,
      size: uploadResult.size,
      imagekitFileId: uploadResult.fileId,
      imagekitUrl: uploadResult.url,
      imagekitFilePath: uploadResult.filePath
    });
    
    await fileRecord.save();
    
    // Custom domain URL
    const customDomain = `${request.protocol}://${request.hostname}` || process.env.CUSTOM_DOMAIN
    const customUrl = `${customDomain}/${customId}`;
    
    return reply.status(201).send({
      success: true,
      file: {
        id: customId,
        filename: uploadResult.name,
        originalFilename: data.filename,
        mimetype: uploadResult.fileType,
        size: uploadResult.size,
        url: customUrl,
        directUrl: uploadResult.url
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
