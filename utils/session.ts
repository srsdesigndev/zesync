export interface SessionData {
    masterKey: string;
    dirHandle: string;
    createdAt: number;
    expiresAt: number;
  }
  
  const SESSION_KEY = 'zesync_session';
  const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  
  export const createSession = (masterKey: string): void => {
    const now = Date.now();
    const session: SessionData = {
      masterKey,
      dirHandle: 'active',
      createdAt: now,
      expiresAt: now + SESSION_DURATION
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  };
  
  export const getSession = (): SessionData | null => {
    const sessionStr = localStorage.getItem(SESSION_KEY);
    if (!sessionStr) return null;
  
    try {
      const session: SessionData = JSON.parse(sessionStr);
      
      if (Date.now() > session.expiresAt) {
        clearSession();
        return null;
      }
      
      return session;
    } catch {
      return null;
    }
  };
  
  export const clearSession = (): void => {
    localStorage.removeItem(SESSION_KEY);
  };
  
  export const isSessionValid = (): boolean => {
    const session = getSession();
    return session !== null;
  };