export interface Config {
  port: number;
  host: string;
  secretToken: string;
  uploadDir: string;
  imagekit: {
    publicKey: string;
    privateKey: string;
    urlEndpoint: string;
  };
}