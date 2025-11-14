'use client';

import { useState, useEffect } from 'react';
import { generatePassword, calculatePasswordStrength, PasswordConfig } from '@/utils/passwordGenerator';
import { useTheme } from '../providers/ThemeProvider';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';

interface Props {
  initialData?: { label: string; email: string; password: string };
  isEditing: boolean;
  onSubmit: (data: { label: string; email: string; password: string }) => void;
  onCancel: () => void;
}

export default function PasswordForm({ initialData, isEditing, onSubmit, onCancel }: Props) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [activeTab, setActiveTab] = useState<'manual' | 'generator'>('manual');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    label: initialData?.label || '',
    email: initialData?.email || '',
    password: initialData?.password || ''
  });

  const [config, setConfig] = useState<PasswordConfig>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecialChars: true,
    customWord: ''
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (activeTab === 'generator' && !isEditing) {
      const newPass = generatePassword(config);
      setFormData(prev => ({ ...prev, password: newPass }));
    }
  }, [config, activeTab, isEditing]);

  const handleSubmit = () => {
    if (!formData.label || !formData.email || !formData.password) {
      alert('Fill all fields');
      return;
    }
    onSubmit(formData);
  };

  const strength = formData.password ? calculatePasswordStrength(formData.password) : null;

  return (
    <div className={`rounded-xl p-6 border-2 transition-all ${
      isDark 
        ? 'bg-[#1a1f3a] border-[#2a3150]' 
        : 'bg-white border-gray-200 shadow-lg'
    }`}>
      <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {isEditing ? 'Edit Password' : 'New Password'}
      </h2>

      {!isEditing && (
        <div className="flex gap-2 mb-6">
          {['manual', 'generator'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'manual' | 'generator')}
              className={`flex-1 px-6 py-3 font-semibold rounded-lg transition ${
                activeTab === tab
                  ? isDark
                    ? 'bg-gradient-to-r from-[#00d9ff] to-[#7b2ff7] text-white'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : isDark
                    ? 'text-gray-400 hover:bg-[#2a3150] border-2 border-[#2a3150]'
                    : 'text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-5">
        {/* Label */}
        <div>
          <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Label <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            placeholder="Netflix, Gmail, etc."
            className={`w-full px-4 py-3 rounded-lg border-2 transition focus:outline-none focus:ring-2 ${
              isDark
                ? 'bg-[#0a0e27] border-[#2a3150] text-white placeholder-gray-500 focus:border-[#00d9ff] focus:ring-[#00d9ff]/20'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20'
            }`}
          />
        </div>

        {/* Email / Username */}
        <div>
          <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Email / Username <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="user@example.com"
            className={`w-full px-4 py-3 rounded-lg border-2 transition focus:outline-none focus:ring-2 ${
              isDark
                ? 'bg-[#0a0e27] border-[#2a3150] text-white placeholder-gray-500 focus:border-[#00d9ff] focus:ring-[#00d9ff]/20'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20'
            }`}
          />
        </div>

        {/* Generator tab */}
        {activeTab === 'generator' && !isEditing && (
          <div className={`p-5 rounded-lg border-2 flex flex-col gap-4 transition-all ${
            isDark
              ? 'bg-[#00d9ff]/5 border-[#00d9ff]/20'
              : 'bg-blue-50 border-blue-200'
          }`}>
            {/* Length */}
            <div>
              <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Length: <span className={isDark ? 'text-[#00d9ff]' : 'text-blue-600'}>{config.length}</span>
              </label>
              <input
                type="range"
                min={8}
                max={32}
                value={config.length}
                onChange={(e) => setConfig({ ...config, length: parseInt(e.target.value) })}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: isDark
                    ? `linear-gradient(to right, #00d9ff 0%, #00d9ff ${((config.length - 8) / 24) * 100}%, #2a3150 ${((config.length - 8) / 24) * 100}%, #2a3150 100%)`
                    : `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((config.length - 8) / 24) * 100}%, #e5e7eb ${((config.length - 8) / 24) * 100}%, #e5e7eb 100%)`
                }}
              />
            </div>

            {/* Custom Word */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Custom Word (Optional)
              </label>
              <input
                type="text"
                value={config.customWord}
                onChange={(e) => setConfig({ ...config, customWord: e.target.value })}
                placeholder="Netflix"
                className={`w-full px-4 py-2.5 rounded-lg border-2 transition focus:outline-none focus:ring-2 ${
                  isDark
                    ? 'bg-[#0a0e27] border-[#2a3150] text-white placeholder-gray-500 focus:border-[#00d9ff] focus:ring-[#00d9ff]/20'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20'
                }`}
              />
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'includeUppercase', label: 'Uppercase (A-Z)' },
                { key: 'includeLowercase', label: 'Lowercase (a-z)' },
                { key: 'includeNumbers', label: 'Numbers (0-9)' },
                { key: 'includeSpecialChars', label: 'Special (!@#$)' }
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config[key as keyof PasswordConfig] as boolean}
                    onChange={(e) => setConfig({ ...config, [key]: e.target.checked })}
                    className={`w-5 h-5 rounded ${
                      isDark
                        ? 'bg-[#0a0e27] border-[#2a3150] checked:bg-[#00d9ff] checked:border-[#00d9ff]'
                        : 'bg-white border-gray-300 checked:bg-blue-600 checked:border-blue-600'
                    }`}
                  />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {label}
                  </span>
                </label>
              ))}
            </div>

            {/* Regenerate */}
            <button
              onClick={() => setFormData(prev => ({ ...prev, password: generatePassword(config) }))}
              className={`w-full px-4 py-3 font-semibold rounded-lg transition flex items-center justify-center gap-2 border-2 ${
                isDark
                  ? 'bg-[#2a3150] border-[#2a3150] text-gray-300 hover:bg-[#3a4160]'
                  : 'bg-gray-100 border-gray-300 text-gray-900 hover:bg-gray-200'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              Regenerate Password
            </button>
          </div>
        )}

        {/* Password */}
        <div>
          <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Your secure password"
              readOnly={activeTab === 'generator' && !isEditing}
              className={`w-full px-4 py-3 pr-12 rounded-lg border-2 font-mono transition focus:outline-none focus:ring-2 ${
                isDark
                  ? 'bg-[#0a0e27] border-[#2a3150] text-white placeholder-gray-500 focus:border-[#00d9ff] focus:ring-[#00d9ff]/20'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-opacity-10 transition ${
                isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {strength && (
            <div className="mt-3">
              <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-[#2a3150]' : 'bg-gray-200'}`}>
                <div
                  className={`h-full transition-all duration-300 ${
                    strength.color === 'red' ? 'bg-red-500' :
                    strength.color === 'orange' ? 'bg-orange-500' :
                    strength.color === 'blue' ? 'bg-blue-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${(strength.score / 7) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className={`text-xs font-semibold ${
                  strength.color === 'red' ? 'text-red-500' :
                  strength.color === 'orange' ? 'text-orange-500' :
                  strength.color === 'blue' ? 'text-blue-500' : 'text-green-500'
                }`}>
                  {strength.label}
                </span>
                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  {strength.score}/7
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button 
            onClick={handleSubmit} 
            className={`flex-1 font-semibold px-6 py-3 rounded-lg transition ${
              isDark
                ? 'bg-gradient-to-r from-[#00d9ff] to-[#7b2ff7] text-white hover:opacity-90'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90'
            }`}
          >
            {isEditing ? 'Update Password' : 'Add Password'}
          </button>
          <button
            onClick={onCancel}
            className={`flex-1 font-semibold px-6 py-3 rounded-lg border-2 transition ${
              isDark
                ? 'bg-[#0a0e27] border-[#2a3150] text-gray-300 hover:bg-[#2a3150]'
                : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}