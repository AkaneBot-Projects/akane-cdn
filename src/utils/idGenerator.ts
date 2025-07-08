import { customAlphabet } from 'nanoid';

// Custom alphabet untuk generate ID yang unik
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const nanoid = customAlphabet(alphabet, 12);

// Generate ID dengan prefix dan suffix acak
export const generateCustomId = (): string => {
  const prefix = customAlphabet('abcdefghijklmnopqrstuvwxyz', 1)();
  const mainId = nanoid();
  const suffix = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6)();
  
  return `${prefix}${mainId}${suffix}`;
};

// Alternative: Generate ID dengan format seperti contoh Anda
export const generateShortId = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789擥圀';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};