import { customAlphabet } from 'nanoid';

const prefixGen = customAlphabet('abcdefghijklmnopqrstuvwxyz', 1);         // 1 char
const mainIdGen = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 5); // 5 chars
const suffixGen = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 2); // 2 chars

export const generateCustomId = (): string => {
  const prefix = prefixGen();
  const mainId = mainIdGen();
  const suffix = suffixGen(); 

  return `${prefix}${mainId}${suffix}`; 
};

export const generateShortId = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789擥圀';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};