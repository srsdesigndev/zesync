import { PasswordEntry, encryptData, decryptData } from './crypto';

export const saveToFile = async (
  dirHandle: FileSystemDirectoryHandle,
  filename: string,
  content: string
): Promise<void> => {
  const fileHandle = await dirHandle.getFileHandle(filename, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();
};

export const readFromFile = async (
  dirHandle: FileSystemDirectoryHandle,
  filename: string
): Promise<string | null> => {
  try {
    const fileHandle = await dirHandle.getFileHandle(filename);
    const file = await fileHandle.getFile();
    return await file.text();
  } catch {
    return null;
  }
};

export const checkMasterKeyExists = async (
  dirHandle: FileSystemDirectoryHandle
): Promise<boolean> => {
  try {
    await dirHandle.getFileHandle('master.key');
    return true;
  } catch {
    return false;
  }
};

export const saveMasterKey = async (
  dirHandle: FileSystemDirectoryHandle,
  masterKey: string
): Promise<void> => {
  await saveToFile(dirHandle, 'master.key', masterKey);
};

export const readMasterKey = async (
  dirHandle: FileSystemDirectoryHandle
): Promise<string | null> => {
  return await readFromFile(dirHandle, 'master.key');
};

export const savePasswords = async (
  dirHandle: FileSystemDirectoryHandle,
  passwords: PasswordEntry[],
  masterKey: string
): Promise<void> => {
  const encrypted = encryptData(JSON.stringify(passwords), masterKey);
  await saveToFile(dirHandle, 'passwords.enc', encrypted);
};

export const loadPasswords = async (
  dirHandle: FileSystemDirectoryHandle,
  masterKey: string
): Promise<PasswordEntry[]> => {
  const encrypted = await readFromFile(dirHandle, 'passwords.enc');
  if (!encrypted) return [];
  
  try {
    const decrypted = decryptData(encrypted, masterKey);
    return JSON.parse(decrypted);
  } catch {
    return [];
  }
};