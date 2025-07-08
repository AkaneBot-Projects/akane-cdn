import ImageKit from 'imagekit';
import config from '../config/env';

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: config.imagekit.publicKey,
  privateKey: config.imagekit.privateKey,
  urlEndpoint: config.imagekit.urlEndpoint
});

export interface ImageKitUploadResult {
  fileId: string;
  name: string;
  size: number;
  filePath: string;
  url: string;
  fileType: string;
  originalFilename: string;
}

/**
 * Upload file to ImageKit
 */
export const uploadToImageKit = async (
  fileBuffer: Buffer,
  fileName: string,
  originalFilename: string
): Promise<ImageKitUploadResult> => {
  try {
    const uploadResponse = await imagekit.upload({
      file: fileBuffer,
      fileName: fileName,
      folder: '/uploads/' // Optional: organize files in folders
    });

    return {
      fileId: uploadResponse.fileId,
      name: uploadResponse.name,
      size: uploadResponse.size,
      filePath: uploadResponse.filePath,
      url: uploadResponse.url,
      fileType: uploadResponse.fileType,
      originalFilename: originalFilename
    };
  } catch (error) {
    throw new Error(`ImageKit upload failed: ${error}`);
  }
};

/**
 * Get file details from ImageKit
 */
export const getFileFromImageKit = async (fileId: string) => {
  try {
    const fileDetails = await imagekit.getFileDetails(fileId);
    return fileDetails;
  } catch (error) {
    throw new Error(`ImageKit file retrieval failed: ${error}`);
  }
};

/**
 * Delete file from ImageKit
 */
export const deleteFromImageKit = async (fileId: string) => {
  try {
    await imagekit.deleteFile(fileId);
    return true;
  } catch (error) {
    throw new Error(`ImageKit file deletion failed: ${error}`);
  }
};