'use client';

import { PasswordEntry } from '@/utils/crypto';
import { useTheme } from '../providers/ThemeProvider';
import { Lock, Mail, Copy, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface Props {
  passwords: PasswordEntry[];
  onEdit: (e: PasswordEntry) => void;
  onDelete: (id: string) => void;
  onCopy: (text: string, field: string) => void;
}

export default function PasswordList({ passwords, onEdit, onDelete, onCopy }: Props) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(new Set());

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (passwords.length === 0) {
    return (
      <div className={`rounded-xl p-16 text-center border-2 transition-all ${
        isDark 
          ? 'bg-[#1a1f3a] border-[#2a3150]' 
          : 'bg-white border-gray-200 shadow-lg'
      }`}>
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
          isDark ? 'bg-[#00d9ff]/10' : 'bg-blue-100'
        }`}>
          <Lock className={`w-12 h-12 ${isDark ? 'text-[#00d9ff]' : 'text-blue-600'}`} />
        </div>
        <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          No Passwords Yet
        </h3>
        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Click "+ New" to add your first password
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {passwords.map((e) => (
        <div 
          key={e.id} 
          className={`rounded-xl p-6 border-2 transition-all hover:scale-[1.01] ${
            isDark 
              ? 'bg-[#1a1f3a] border-[#2a3150] hover:border-[#00d9ff]' 
              : 'bg-white border-gray-200 hover:border-blue-400 shadow-sm hover:shadow-lg'
          }`}
        >
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1 min-w-0">
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {e.label}
              </h3>
              
              <div className="flex flex-col gap-3">
                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    isDark ? 'bg-[#00d9ff]/10' : 'bg-blue-50'
                  }`}>
                    <Mail className={`w-4 h-4 ${isDark ? 'text-[#00d9ff]' : 'text-blue-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold mb-1 ${
                      isDark ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      EMAIL / USERNAME
                    </p>
                    <p className={`truncate ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {e.email}
                    </p>
                  </div>
                  <button 
                    onClick={() => onCopy(e.email, 'Email')}
                    className={`p-2 rounded-lg transition ${
                      isDark 
                        ? 'hover:bg-[#2a3150] text-gray-400 hover:text-[#00d9ff]' 
                        : 'hover:bg-gray-100 text-gray-500 hover:text-blue-600'
                    }`}
                    title="Copy email"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                {/* Password */}
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    isDark ? 'bg-[#00d9ff]/10' : 'bg-blue-50'
                  }`}>
                    <Lock className={`w-4 h-4 ${isDark ? 'text-[#00d9ff]' : 'text-blue-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold mb-1 ${
                      isDark ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      PASSWORD
                    </p>
                    <p className={`font-mono truncate ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {visiblePasswords.has(e.id) 
                        ? e.password 
                        : '•'.repeat(Math.min(e.password.length, 12))
                      }
                    </p>
                  </div>
                  <button 
                    onClick={() => togglePasswordVisibility(e.id)}
                    className={`p-2 rounded-lg transition ${
                      isDark 
                        ? 'hover:bg-[#2a3150] text-gray-400 hover:text-[#00d9ff]' 
                        : 'hover:bg-gray-100 text-gray-500 hover:text-blue-600'
                    }`}
                    title={visiblePasswords.has(e.id) ? "Hide password" : "Show password"}
                  >
                    {visiblePasswords.has(e.id) ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <button 
                    onClick={() => onCopy(e.password, 'Password')}
                    className={`p-2 rounded-lg transition ${
                      isDark 
                        ? 'hover:bg-[#2a3150] text-gray-400 hover:text-[#00d9ff]' 
                        : 'hover:bg-gray-100 text-gray-500 hover:text-blue-600'
                    }`}
                    title="Copy password"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button 
                onClick={() => onEdit(e)} 
                className={`p-3 rounded-lg transition border-2 ${
                  isDark 
                    ? 'border-[#2a3150] text-gray-300 hover:bg-[#2a3150] hover:border-[#00d9ff]' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-blue-400'
                }`}
                title="Edit password"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onDelete(e.id)} 
                className={`p-3 rounded-lg transition border-2 ${
                  isDark 
                    ? 'border-red-900/30 text-red-400 hover:bg-red-900/20 hover:border-red-500' 
                    : 'border-red-200 text-red-600 hover:bg-red-50 hover:border-red-400'
                }`}
                title="Delete password"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Metadata */}
          <div className={`mt-4 pt-4 border-t flex items-center justify-between text-xs ${
            isDark ? 'border-[#2a3150] text-gray-500' : 'border-gray-200 text-gray-500'
          }`}>
            <span>Created: {new Date(e.createdAt).toLocaleDateString()}</span>
            <span>Updated: {new Date(e.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}