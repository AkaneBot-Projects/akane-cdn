import dotenv from 'dotenv';
import path from 'path';
import { Config } from '../types/';

dotenv.config();

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  host: process.env.HOST || '0.0.0.0',
  secretToken: process.env.SECRET_TOKEN || '',
  uploadDir: path.join(process.cwd(), 'storage'),
  imagekit: {
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || ''
  }
};

export default config;