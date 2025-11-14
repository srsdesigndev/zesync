'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { generateMasterKey } from '@/utils/crypto';
import { checkMasterKeyExists, saveMasterKey, readMasterKey } from '@/utils/fileSystem';
import { createSession } from '@/utils/session';
import { useTheme } from '../providers/ThemeProvider';
import { Shield, Folder, Key, Lock, Check, Info, AlertTriangle, AlertCircle, Copy, Download } from 'lucide-react';

type Step = 'welcome' | 'select-folder' | 'create-key' | 'enter-key' | 'key-created';

export default function GetStarted() {
  const router = useRouter();
  const { theme } = useTheme();
  const [step, setStep] = useState<Step>('welcome');
  const [dirHandle, setDirHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [masterKey, setMasterKey] = useState('');
  const [generatedKey, setGeneratedKey] = useState('');
  const [error, setError] = useState('');
  const [folderName, setFolderName] = useState('');
  const [isRetrieving, setIsRetrieving] = useState(false);

  const isDark = theme === 'dark';

  const selectDirectory = async () => {
    try {
      const handle = await (window as any).showDirectoryPicker();
      setDirHandle(handle);
      setFolderName(handle.name);

      const hasKey = await checkMasterKeyExists(handle);
      setStep(hasKey ? 'enter-key' : 'create-key');
      setError('');
    } catch (err: any) {
      if (err.name !== 'AbortError') setError('Failed to select directory');
    }
  };

  const createNewKey = async () => {
    if (!dirHandle) return;
    try {
      const newKey = generateMasterKey();
      await saveMasterKey(dirHandle, newKey);
      setGeneratedKey(newKey);
      setStep('key-created');
      setError('');
    } catch {
      setError('Failed to create master key');
    }
  };

  const loginWithKey = async () => {
    if (!dirHandle || !masterKey) {
      setError('Please enter your master key');
      return;
    }
    try {
      const storedKey = await readMasterKey(dirHandle);
      if (storedKey === masterKey) {
        createSession(masterKey);
        router.push('/dashboard');
      } else {
        setError('Invalid master key');
      }
    } catch {
      setError('Failed to validate master key');
    }
  };

  const continueWithKey = () => {
    createSession(generatedKey);
    router.push('/dashboard');
  };

  const retrieveMasterKey = async () => {
    if (isRetrieving) return;
    setIsRetrieving(true);
    try {
      const handle = await (window as any).showDirectoryPicker();
      const key = await readMasterKey(handle);
      if (key) {
        setGeneratedKey(key);
        setStep('key-created');
        setError('');
      } else {
        setError('No master key found in selected directory');
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') setError('Failed to retrieve master key');
    } finally {
      setIsRetrieving(false);
    }
  };

  const downloadMasterKey = () => {
    const blob = new Blob([generatedKey], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'altron-master-key.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-8 transition-colors ${
      isDark ? 'bg-[#0a0e27]' : 'bg-white'
    }`}>
      <div className="max-w-2xl w-full">
        {/* WELCOME STEP */}
        {step === 'welcome' && (
          <div className={`rounded-xl p-12 text-center border-2 transition-all ${
            isDark 
              ? 'bg-[#1a1f3a] border-[#2a3150]' 
              : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <div className="mb-8">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
                isDark ? 'bg-[#00d9ff]' : 'bg-blue-600'
              }`}>
                <Shield className={`w-12 h-12 ${
                  isDark ? 'text-[#0a0e27]' : 'text-white'
                }`} />
              </div>
              <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Welcome to Altron
              </h1>
              <p className={`text-lg mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Local Password Manager
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Your passwords stay on your device. No cloud. No sync. Complete privacy.
              </p>
            </div>

            <div className="space-y-4 mt-12">
              <button 
                onClick={() => setStep('select-folder')} 
                className={`w-full py-4 text-lg font-semibold rounded-lg transition ${
                  isDark 
                    ? 'bg-gradient-to-r from-[#00d9ff] to-[#7b2ff7] text-white hover:opacity-90' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90'
                }`}
              >
                Get Started
              </button>
              <button 
                onClick={retrieveMasterKey} 
                disabled={isRetrieving} 
                className={`w-full font-medium py-3 rounded-lg transition disabled:opacity-50 ${
                  isDark 
                    ? 'text-[#00d9ff] hover:bg-[#2a3150]' 
                    : 'text-blue-600 hover:bg-gray-50'
                }`}
              >
                {isRetrieving ? 'Loading...' : 'I forgot my master key'}
              </button>
            </div>
          </div>
        )}

        {/* SELECT FOLDER */}
        {step === 'select-folder' && (
          <div className={`rounded-xl p-10 border-2 transition-all ${
            isDark 
              ? 'bg-[#1a1f3a] border-[#2a3150]' 
              : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <div className="mb-8">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                isDark ? 'bg-[#00d9ff]' : 'bg-blue-600'
              }`}>
                <Folder className={`w-10 h-10 ${
                  isDark ? 'text-[#0a0e27]' : 'text-white'
                }`} />
              </div>
              <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Choose Storage Location
              </h2>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                Select a folder where your encrypted passwords will be stored securely.
              </p>
            </div>

            <div className={`rounded-lg p-5 mb-8 border-2 ${
              isDark 
                ? 'bg-[#00d9ff]/10 border-[#00d9ff]/30' 
                : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-start gap-3">
                <Info className={`w-5 h-5 mt-1 flex-shrink-0 ${
                  isDark ? 'text-[#00d9ff]' : 'text-blue-600'
                }`} />
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  One folder = One master key. Remember this location for future access.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={selectDirectory} 
                className={`w-full py-4 text-lg font-semibold rounded-lg transition ${
                  isDark 
                    ? 'bg-gradient-to-r from-[#00d9ff] to-[#7b2ff7] text-white hover:opacity-90' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90'
                }`}
              >
                Select Folder
              </button>
              <button 
                onClick={() => setStep('welcome')} 
                className={`w-full py-3 font-medium rounded-lg border-2 transition ${
                  isDark 
                    ? 'border-[#2a3150] text-gray-300 hover:bg-[#2a3150]' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* CREATE KEY */}
        {step === 'create-key' && (
          <div className={`rounded-xl p-10 border-2 transition-all ${
            isDark 
              ? 'bg-[#1a1f3a] border-[#2a3150]' 
              : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <div className="mb-8">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                isDark ? 'bg-[#00d9ff]' : 'bg-blue-600'
              }`}>
                <Key className={`w-10 h-10 ${
                  isDark ? 'text-[#0a0e27]' : 'text-white'
                }`} />
              </div>
              <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Create Master Key
              </h2>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                Selected folder: <span className="font-semibold">{folderName}</span>
              </p>
            </div>

            <div className={`rounded-lg p-5 mb-8 border-2 ${
              isDark 
                ? 'bg-amber-500/10 border-amber-500/30' 
                : 'bg-amber-50 border-amber-200'
            }`}>
              <div className="flex items-start gap-3">
                <AlertTriangle className={`w-5 h-5 mt-1 flex-shrink-0 ${
                  isDark ? 'text-amber-400' : 'text-amber-600'
                }`} />
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  Store your master key safely. Without it, you cannot access your passwords.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={createNewKey} 
                className={`w-full py-4 text-lg font-semibold rounded-lg transition ${
                  isDark 
                    ? 'bg-gradient-to-r from-[#00d9ff] to-[#7b2ff7] text-white hover:opacity-90' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90'
                }`}
              >
                Generate Master Key
              </button>
              <button 
                onClick={() => setStep('select-folder')} 
                className={`w-full py-3 font-medium rounded-lg border-2 transition ${
                  isDark 
                    ? 'border-[#2a3150] text-gray-300 hover:bg-[#2a3150]' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* ENTER KEY */}
        {step === 'enter-key' && (
          <div className={`rounded-xl p-10 border-2 transition-all ${
            isDark 
              ? 'bg-[#1a1f3a] border-[#2a3150]' 
              : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <div className="mb-8">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                isDark ? 'bg-[#00d9ff]' : 'bg-blue-600'
              }`}>
                <Lock className={`w-10 h-10 ${
                  isDark ? 'text-[#0a0e27]' : 'text-white'
                }`} />
              </div>
              <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Enter Master Key
              </h2>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                Vault found in: <span className="font-semibold">{folderName}</span>
              </p>
            </div>

            <input
              type="password"
              value={masterKey}
              onChange={(e) => setMasterKey(e.target.value)}
              placeholder="Enter your master key"
              onKeyPress={(e) => e.key === 'Enter' && loginWithKey()}
              className={`w-full px-4 py-3 rounded-lg border-2 mb-4 font-mono transition focus:outline-none focus:ring-2 ${
                isDark 
                  ? 'bg-[#0a0e27] border-[#2a3150] text-white placeholder-gray-500 focus:border-[#00d9ff] focus:ring-[#00d9ff]/20' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20'
              }`}
            />

            {error && (
              <div className={`mb-6 p-4 rounded-lg border-2 flex items-start gap-3 ${
                isDark 
                  ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}>
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-4">
              <button 
                onClick={loginWithKey} 
                className={`w-full py-4 text-lg font-semibold rounded-lg transition ${
                  isDark 
                    ? 'bg-gradient-to-r from-[#00d9ff] to-[#7b2ff7] text-white hover:opacity-90' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90'
                }`}
              >
                Unlock Vault
              </button>
              <button 
                onClick={() => setStep('select-folder')} 
                className={`w-full py-3 font-medium rounded-lg border-2 transition ${
                  isDark 
                    ? 'border-[#2a3150] text-gray-300 hover:bg-[#2a3150]' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* KEY CREATED */}
        {step === 'key-created' && (
          <div className={`rounded-xl p-10 border-2 transition-all ${
            isDark 
              ? 'bg-[#1a1f3a] border-[#2a3150]' 
              : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <div className="mb-8 text-center">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                isDark ? 'bg-[#00d9ff]' : 'bg-blue-600'
              }`}>
                <Check className={`w-10 h-10 ${
                  isDark ? 'text-[#0a0e27]' : 'text-white'
                }`} />
              </div>
              <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Master Key Created
              </h2>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                Save this key securely. You'll need it to access your passwords.
              </p>
            </div>

            <div className={`rounded-lg p-5 mb-6 border-2 ${
              isDark 
                ? 'bg-[#0a0e27] border-[#2a3150]' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <code className={`text-sm font-mono break-all block ${
                isDark ? 'text-[#00d9ff]' : 'text-blue-600'
              }`}>
                {generatedKey}
              </code>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <button 
                onClick={() => { 
                  navigator.clipboard.writeText(generatedKey); 
                  alert('Master key copied!'); 
                }} 
                className={`py-3 font-medium rounded-lg border-2 transition flex items-center justify-center gap-2 ${
                  isDark 
                    ? 'border-[#2a3150] text-gray-300 hover:bg-[#2a3150]' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
              <button 
                onClick={downloadMasterKey} 
                className={`py-3 font-medium rounded-lg border-2 transition flex items-center justify-center gap-2 ${
                  isDark 
                    ? 'border-[#2a3150] text-gray-300 hover:bg-[#2a3150]' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>

            <button 
              onClick={continueWithKey} 
              className={`w-full py-4 text-lg font-semibold rounded-lg transition ${
                isDark 
                  ? 'bg-gradient-to-r from-[#00d9ff] to-[#7b2ff7] text-white hover:opacity-90' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90'
              }`}
            >
              Continue to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}