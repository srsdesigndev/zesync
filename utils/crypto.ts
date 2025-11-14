import CryptoJS from 'crypto-js';

export interface PasswordEntry {
  id: string;
  label: string;
  email: string;
  password: string;
  createdAt: number;
  updatedAt: number;
}

export const generateMasterKey = (): string => {
  return CryptoJS.lib.WordArray.random(32).toString();
};

export const encryptData = (data: string, masterKey: string): string => {
  return CryptoJS.AES.encrypt(data, masterKey).toString();
};

export const decryptData = (encryptedData: string, masterKey: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, masterKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const validateMasterKey = (masterKey: string, encryptedData: string): boolean => {
  try {
    const decrypted = decryptData(encryptedData, masterKey);
    return decrypted.length > 0;
  } catch {
    return false;
  }
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};