import fs from 'fs';
import path from 'path';
import { FastifyRequest } from 'fastify';
import { MultipartFile } from '@fastify/multipart';
import { pipeline } from 'stream';
import { promisify } from 'util';
import crypto from 'crypto';

const pump = promisify(pipeline);

/**
 * Interface for file upload result
 */
export interface FileUploadResult {
  filename: string;
  originalFilename: string;
  mimetype: string;
  size: number;
}

/**
 * Generates a unique filename
 */
export const generateUniqueFilename = (originalFilename: string): string => {
  const timestamp = Date.now();
  const random = crypto.randomBytes(8).toString('hex');
  const extension = path.extname(originalFilename);
  return `${timestamp}-${random}${extension}`;
};

/**
 * Saves a file from a multipart request
 */
export const saveFile = async (
  file: MultipartFile, 
  storagePath: string = process.env.STORAGE_PATH || 'storage'
): Promise<FileUploadResult> => {
  const uniqueFilename = generateUniqueFilename(file.filename);
  const fullPath = path.resolve(process.cwd(), storagePath, uniqueFilename);
  
  // Save the file
  await pump(file.file, fs.createWriteStream(fullPath));
  
  return {
    filename: uniqueFilename,
    originalFilename: file.filename,
    mimetype: file.mimetype,
    size: file.file.bytesRead
  };
};

/**
 * Retrieves a file from storage
 */
export const getFilePath = (
  filename: string, 
  storagePath: string = process.env.STORAGE_PATH || 'storage'
): string => {
  return path.resolve(process.cwd(), storagePath, filename);
};

/**
 * Checks if a file exists in storage
 */
export const fileExists = (
  filename: string, 
  storagePath: string = process.env.STORAGE_PATH || 'storage'
): boolean => {
  const filePath = getFilePath(filename, storagePath);
  return fs.existsSync(filePath);
};