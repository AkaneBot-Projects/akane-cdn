import mongoose, { Document, Schema } from 'mongoose';

export interface IFile extends Document {
  customId: string;
  filename: string;
  originalFilename: string;
  mimetype: string;
  size: number;
  imagekitFileId: string;
  imagekitUrl: string;
  imagekitFilePath: string;
  uploadedAt: Date;
  uploadedBy?: string;
}

const fileSchema = new Schema<IFile>({
  customId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  filename: {
    type: String,
    required: true
  },
  originalFilename: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  imagekitFileId: {
    type: String,
    required: true
  },
  imagekitUrl: {
    type: String,
    required: true
  },
  imagekitFilePath: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  uploadedBy: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

export const File = mongoose.model<IFile>('File', fileSchema);