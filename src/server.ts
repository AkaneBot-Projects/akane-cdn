import { buildApp } from './app';
import config from './config/env';

/**
 * Start the server
 */
const startServer = async (): Promise<void> => {
  try {
    // Check if SECRET_TOKEN is set
    if (!config.secretToken) {
      console.error('ERROR: SECRET_TOKEN is not set in environment variables');
      console.error('Please set SECRET_TOKEN in your .env file');
      process.exit(1);
    }

    const app = await buildApp();
    
    app.listen({
      port: config.port,
      host: config.host
    });
    
    console.log(`🚀 Server running at http://${config.host === '0.0.0.0' ? 'localhost' : config.host}:${config.port}`);
    console.log('📁 Upload endpoint: POST /upload (requires Authorization header)');
    console.log('🔗 File serving endpoint: GET /f/:filename (public access)');
    console.log(`📂 Files are stored in the '${config.uploadDir}' directory`);
    
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

export { startServer };