'use client';

import { useTheme } from '../providers/ThemeProvider';

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer
      className={`py-4 px-8 border-t transition-colors ${
        isDark 
          ? 'border-[#2a3150] bg-[#1a1f3a]' 
          : 'border-gray-200 bg-white'
      }`}
    >
      <div className="flex justify-between items-center text-sm">
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
          © 2025 Altron — Local & Secure Password Manager
        </p>
        <div className="flex items-center gap-4">
          <p className={isDark ? 'text-gray-500' : 'text-gray-500'}>
            v1.0.0
          </p>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            isDark 
              ? 'bg-[#00d9ff]/10 text-[#00d9ff]' 
              : 'bg-blue-100 text-blue-600'
          }`}>
            Encrypted Locally
          </span>
        </div>
      </div>
    </footer>
  );
}