export interface PasswordConfig {
    length: number;
    includeUppercase: boolean;
    includeLowercase: boolean;
    includeNumbers: boolean;
    includeSpecialChars: boolean;
    customWord?: string;
  }
  
  const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
  const NUMBERS = '0123456789';
  const SPECIAL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  export const generatePassword = (config: PasswordConfig): string => {
    let chars = '';
    let password = '';
  
    if (config.includeUppercase) chars += UPPERCASE;
    if (config.includeLowercase) chars += LOWERCASE;
    if (config.includeNumbers) chars += NUMBERS;
    if (config.includeSpecialChars) chars += SPECIAL_CHARS;
  
    if (chars.length === 0) {
      chars = LOWERCASE + NUMBERS;
    }
  
    if (config.customWord && config.customWord.length > 0) {
      password = config.customWord;
      const remainingLength = config.length - config.customWord.length;
      
      if (remainingLength > 0) {
        for (let i = 0; i < remainingLength; i++) {
          password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        password = shuffleString(password);
      }
    } else {
      for (let i = 0; i < config.length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }
  
    return password;
  };
  
  const shuffleString = (str: string): string => {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  };
  
  export const calculatePasswordStrength = (password: string): {
    score: number;
    label: string;
    color: string;
  } => {
    let score = 0;
  
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  
    if (score <= 2) return { score, label: 'Weak', color: 'red' };
    if (score <= 4) return { score, label: 'Fair', color: 'orange' };
    if (score <= 6) return { score, label: 'Good', color: 'blue' };
    return { score, label: 'Strong', color: 'green' };
  };