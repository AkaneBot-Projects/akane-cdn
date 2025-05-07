# Fastify File Uploader

Simple file uploader service built with Fastify and TypeScript. This service allows for private file uploads (protected by a secret token) and public file access.

## Features

- **Private File Upload**: POST endpoint `/upload` protected with token authentication
- **Public File Access**: GET endpoint `/f/:filename` for accessing uploaded files
- **TypeScript**: Full TypeScript support
- **Modular Architecture**: Well-organized project structure

## Project Structure

```
akane-cdn/
│
├── src/
│   ├── controllers/     # Request handlers
│   │   ├── fileController.ts
│   │   └── uploadController.ts
│   │
│   ├── routes/          # Route definitions
│   │   ├── file.ts
│   │   └── upload.ts
│   │
│   ├── utils/           # Utility functions
│   │   ├── fileHandler.ts
│   │   └── tokenChecker.ts
│   │
│   └── index.ts         # Application entry point
│
├── storage/             # Uploaded files (created automatically)
├── .env                 # Environment variables
├── .gitignore           # Git ignore file
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project documentation
```

## Setup & Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   SECRET_TOKEN=your_secret_token_here
   STORAGE_PATH=storage
   ```
4. Build the project:
   ```bash
   npm run build
   ```
5. Start the server:
   ```bash
   npm start
   ```

For development, you can use:
```bash
npm run dev
```

## API Endpoints

### Upload File
- **URL**: `/upload`
- **Method**: `POST`
- **Authentication**: Required
- **Headers**:
  - `Authorization: Bearer your_secret_token_here`
- **Content-Type**: `multipart/form-data`
- **Response**:
  ```json
  {
    "success": true,
    "file": {
      "filename": "1620000000000-abcdef1234567890.jpg",
      "originalFilename": "example.jpg",
      "mimetype": "image/jpeg",
      "size": 1234567,
      "url": "http://localhost:3000/f/1620000000000-abcdef1234567890.jpg"
    }
  }
  ```

### Access File
- **URL**: `/f/:filename`
- **Method**: `GET`
- **Authentication**: None
- **Response**: The requested file with appropriate Content-Type header

## Example Usage

### Uploading a file using cURL:
```bash
curl -X POST \
  -H "Authorization: Bearer your_secret_token_here" \
  -F "file=@/path/to/your/file.jpg" \
  http://localhost:3000/upload
```

### Accessing a file:
Simply open in a browser or use:
```bash
curl http://localhost:3000/f/your-file-name.jpg > downloaded-file.jpg
```

## Security Considerations

- The upload endpoint is protected by a secret token
- The file access endpoint is public - anyone with the file URL can access it
- File names are randomized to prevent guessing
- Directory traversal protection is implemented

## License

MIT