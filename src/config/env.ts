import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

interface Config {
  port: number;
  host: string;
  secretToken: string;
  uploadDir: string;
}

// Default configuration
const config: Config = {
  port: Number(process.env.PORT) || 3000,
  host: process.env.HOST || '0.0.0.0',
  secretToken: process.env.SECRET_TOKEN || '',
  uploadDir: path.join(process.cwd(), 'storage')
};

export default config; 