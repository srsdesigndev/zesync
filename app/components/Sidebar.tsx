'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '../providers/ThemeProvider';
import { Shield, Lock, HelpCircle, LogOut, Sun, Moon } from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <aside
      className={`w-72 h-screen flex flex-col border-r transition-colors ${
        isDark 
          ? 'bg-[#1a1f3a] border-[#2a3150]' 
          : 'bg-white border-gray-200'
      }`}
    >
      {/* Header */}
      <div className={`p-6 border-b ${isDark ? 'border-[#2a3150]' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-2">
          <div className={`p-2 rounded-lg ${
            isDark ? 'bg-[#00d9ff]' : 'bg-blue-600'
          }`}>
            <Shield className={`w-5 h-5 ${
              isDark ? 'text-[#0a0e27]' : 'text-white'
            }`} />
          </div>
          <h1 className={`text-2xl font-bold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Altron
          </h1>
        </div>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Local Password Manager
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="flex flex-col gap-2">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition no-underline ${
              pathname === '/dashboard'
                ? isDark
                  ? 'bg-gradient-to-r from-[#00d9ff] to-[#7b2ff7] text-white'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : isDark
                  ? 'text-gray-300 hover:bg-[#2a3150]'
                  : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Lock className="w-5 h-5" />
            Passwords
          </Link>

          <Link
            href="/dashboard/help"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition no-underline ${
              pathname === '/dashboard/help'
                ? isDark
                  ? 'bg-gradient-to-r from-[#00d9ff] to-[#7b2ff7] text-white'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : isDark
                  ? 'text-gray-300 hover:bg-[#2a3150]'
                  : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <HelpCircle className="w-5 h-5" />
            Help
          </Link>
        </div>
      </nav>

      {/* Footer Actions */}
      <div className={`p-4 border-t flex flex-col gap-3 ${
        isDark ? 'border-[#2a3150]' : 'border-gray-200'
      }`}>
        {/* Theme Toggle */}
        <div className={`flex items-center justify-between px-4 py-3 rounded-lg ${
          isDark ? 'bg-[#0a0e27]' : 'bg-gray-50'
        }`}>
          <div className="flex items-center gap-3">
            {isDark ? (
              <Moon className="w-5 h-5 text-[#00d9ff]" />
            ) : (
              <Sun className="w-5 h-5 text-blue-600" />
            )}
            <span className={`text-sm font-medium ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {isDark ? 'Dark' : 'Light'} Mode
            </span>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              isDark 
                ? 'bg-[#00d9ff]' 
                : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition shadow-sm ${
                isDark ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition font-semibold border-2 ${
            isDark
              ? 'text-red-400 hover:bg-red-900/20 border-red-900/30 hover:border-red-500'
              : 'text-red-600 hover:bg-red-50 border-red-200 hover:border-red-400'
          }`}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>

        {/* Version Badge */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            v1.0.0
          </span>
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
            isDark 
              ? 'bg-[#00d9ff]/10 text-[#00d9ff]' 
              : 'bg-blue-100 text-blue-600'
          }`}>
            AES-256
          </span>
        </div>
      </div>
    </aside>
  );
}