'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession, clearSession } from '@/utils/session';
import Sidebar from '@/app/components/Sidebar';
import Footer from '@/app/components/Footer';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Folder, Key, Lock, Shield, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function Help() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!getSession()) router.push('/');
  }, [router]);

  return (
    <div className={`flex h-screen ${isDark ? 'bg-[#0a0e27]' : 'bg-gray-50'}`}>
      <Sidebar onLogout={() => { clearSession(); router.push('/'); }} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className={`px-8 py-6 border-b ${
          isDark ? 'bg-[#1a1f3a] border-[#2a3150]' : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Help & Guide
          </h2>
          <p className={isDark ? 'text-gray-400 mt-1' : 'text-gray-500 mt-1'}>
            Everything you need to know about Altron
          </p>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl flex flex-col gap-6">
            {/* Getting Started */}
            <div className={`rounded-xl p-8 border-2 transition-all ${
              isDark 
                ? 'bg-[#1a1f3a] border-[#2a3150]' 
                : 'bg-white border-gray-200 shadow-lg'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-[#00d9ff]/10' : 'bg-blue-100'
                }`}>
                  <Info className={`w-6 h-6 ${isDark ? 'text-[#00d9ff]' : 'text-blue-600'}`} />
                </div>
                <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Getting Started
                </h3>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { icon: Folder, text: 'Select a secure folder on your device for storage' },
                  { icon: Key, text: 'Generate and save your master key securely' },
                  { icon: Lock, text: 'Start adding and managing your passwords' }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${
                      isDark ? 'bg-[#00d9ff]/10' : 'bg-blue-50'
                    }`}>
                      <step.icon className={`w-5 h-5 ${isDark ? 'text-[#00d9ff]' : 'text-blue-600'}`} />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className={`font-bold mr-2 ${isDark ? 'text-[#00d9ff]' : 'text-blue-600'}`}>
                          {idx + 1}.
                        </span>
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Best Practices */}
            <div className={`rounded-xl p-8 border-2 transition-all ${
              isDark 
                ? 'bg-[#1a1f3a] border-[#2a3150]' 
                : 'bg-white border-gray-200 shadow-lg'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-[#00d9ff]/10' : 'bg-blue-100'
                }`}>
                  <Shield className={`w-6 h-6 ${isDark ? 'text-[#00d9ff]' : 'text-blue-600'}`} />
                </div>
                <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Security Best Practices
                </h3>
              </div>
              <div className="grid gap-4">
                {[
                  'Keep your master key in a secure location (not in the vault folder)',
                  'Backup your vault folder regularly to external storage',
                  'Use the password generator for strong, unique passwords',
                  'Remember: One folder = One master key',
                  'Never share your master key with anyone',
                  'Use AES-256 encryption for maximum security'
                ].map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      isDark ? 'text-[#00d9ff]' : 'text-blue-600'
                    }`} />
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className={`rounded-xl p-8 border-2 transition-all ${
              isDark 
                ? 'bg-[#1a1f3a] border-[#2a3150]' 
                : 'bg-white border-gray-200 shadow-lg'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Key Features
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: '100% Local Storage', desc: 'All data stays on your device' },
                  { title: 'AES-256 Encryption', desc: 'Military-grade security' },
                  { title: 'Zero Knowledge', desc: 'Only you can access your data' },
                  { title: 'Password Generator', desc: 'Create strong passwords easily' },
                  { title: 'Works Offline', desc: 'No internet required' },
                  { title: 'Open Source', desc: 'Transparent and auditable code' }
                ].map((feature, idx) => (
                  <div key={idx} className={`p-4 rounded-lg border-2 ${
                    isDark 
                      ? 'bg-[#0a0e27] border-[#2a3150]' 
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <h4 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {feature.title}
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Critical Warning */}
            <div className={`rounded-xl p-6 border-2 flex items-start gap-4 ${
              isDark 
                ? 'bg-amber-500/10 border-amber-500/30' 
                : 'bg-amber-50 border-amber-200'
            }`}>
              <AlertTriangle className={`w-6 h-6 flex-shrink-0 ${
                isDark ? 'text-amber-400' : 'text-amber-600'
              }`} />
              <div>
                <h4 className={`font-bold mb-1 ${
                  isDark ? 'text-amber-400' : 'text-amber-900'
                }`}>
                  Critical: Master Key Recovery
                </h4>
                <p className={`text-sm ${
                  isDark ? 'text-amber-200' : 'text-amber-800'
                }`}>
                  Without your master key, your passwords are lost forever. There is no recovery option. 
                  Please store your master key in a safe place outside of the vault folder.
                </p>
              </div>
            </div>

            {/* Browser Support */}
            <div className={`rounded-xl p-8 border-2 transition-all ${
              isDark 
                ? 'bg-[#1a1f3a] border-[#2a3150]' 
                : 'bg-white border-gray-200 shadow-lg'
            }`}>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Browser Requirements
              </h3>
              <div className={`p-4 rounded-lg ${
                isDark ? 'bg-[#0a0e27]' : 'bg-gray-50'
              }`}>
                <p className={`mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Altron requires the File System Access API:
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    isDark 
                      ? 'bg-[#00d9ff]/10 text-[#00d9ff]' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    ✓ Chrome 86+
                  </span>
                  <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    isDark 
                      ? 'bg-[#00d9ff]/10 text-[#00d9ff]' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    ✓ Edge 86+
                  </span>
                  <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    isDark 
                      ? 'bg-red-500/10 text-red-400' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    ✗ Firefox
                  </span>
                  <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    isDark 
                      ? 'bg-red-500/10 text-red-400' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    ✗ Safari
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}