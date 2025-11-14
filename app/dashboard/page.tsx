'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PasswordEntry, generateId } from '@/utils/crypto';
import { savePasswords, loadPasswords } from '@/utils/fileSystem';
import { getSession, clearSession } from '@/utils/session';
import { saveDirectoryHandle, getDirectoryHandle, clearDirectoryHandle } from '@/utils/persistHandle';
import Sidebar from '@/app/components/Sidebar';
import PasswordList from '@/app/components/PasswordList';
import PasswordForm from '@/app/components/PasswordForm';
import Footer from '@/app/components/Footer';
import { useTheme } from '../providers/ThemeProvider';

type View = 'list' | 'form';

export default function Dashboard() {
  const router = useRouter();
  const { theme } = useTheme();

  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [masterKey, setMasterKey] = useState('');
  const [dirHandle, setDirHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>('list');
  const [editing, setEditing] = useState<PasswordEntry | null>(null);

  const isDark = theme === 'dark';

  // Load session + restore directory handle
  useEffect(() => {
    const initDashboard = async () => {
      const session = getSession();
      if (!session) {
        router.push('/');
        return;
      }
      setMasterKey(session.masterKey);

      // Try to restore directory handle from IndexedDB
      const savedHandle = await getDirectoryHandle();
      if (savedHandle) {
        setDirHandle(savedHandle);
        try {
          const loaded = await loadPasswords(savedHandle, session.masterKey);
          setPasswords(loaded);
        } catch (error) {
          console.error('Failed to load passwords:', error);
        }
      }

      setReady(true);
      setLoading(false);
    };

    initDashboard();
  }, [router]);

  const requestAccess = async () => {
    try {
      const handle = await (window as any).showDirectoryPicker({ mode: 'readwrite' });
      setDirHandle(handle);
      
      // Save handle to IndexedDB for persistence across refreshes
      await saveDirectoryHandle(handle);
      
      const loaded = await loadPasswords(handle, masterKey);
      setPasswords(loaded);
    } catch (err: any) {
      if (err.name !== 'AbortError') alert('Failed to select folder');
    }
  };

  const saveToFile = async (updated: PasswordEntry[]) => {
    if (!dirHandle || !masterKey) return;
    try {
      await savePasswords(dirHandle, updated, masterKey);
      setPasswords(updated);
    } catch {
      alert('Failed to save');
    }
  };

  const handleSubmit = async (data: { label: string; email: string; password: string }) => {
    const updated = editing
      ? passwords.map(p => (p.id === editing.id ? { ...p, ...data, updatedAt: Date.now() } : p))
      : [...passwords, { id: generateId(), ...data, createdAt: Date.now(), updatedAt: Date.now() }];

    await saveToFile(updated);
    setView('list');
    setEditing(null);
  };

  const handleLogout = async () => {
    setDirHandle(null);
    await clearDirectoryHandle();
    clearSession();
    router.push('/');
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#0a0e27]' : 'bg-white'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!ready) return null;

  if (!dirHandle) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-6 transition-colors ${
        isDark ? 'bg-[#0a0e27]' : 'bg-white'
      }`}>
        <div className={`max-w-md w-full rounded-xl p-10 text-center border-2 transition-all ${
          isDark 
            ? 'bg-[#1a1f3a] border-[#2a3150]' 
            : 'bg-white border-gray-200 shadow-lg'
        }`}>
          <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
            isDark ? 'bg-[#00d9ff]' : 'bg-blue-600'
          }`}>
            <svg className={`w-10 h-10 ${isDark ? 'text-[#0a0e27]' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          <h1 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Select Your Vault Folder
          </h1>
          <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Choose the folder where your passwords are stored
          </p>
          <button 
            onClick={requestAccess} 
            className={`w-full font-semibold px-6 py-3 rounded-lg transition mb-3 ${
              isDark 
                ? 'bg-gradient-to-r from-[#00d9ff] to-[#7b2ff7] text-white hover:opacity-90' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90'
            }`}
          >
            Select Folder
          </button>
          <button 
            onClick={handleLogout} 
            className={`w-full font-semibold px-6 py-3 rounded-lg transition border-2 ${
              isDark 
                ? 'bg-[#0a0e27] border-[#2a3150] text-gray-300 hover:bg-[#2a3150]' 
                : 'bg-gray-100 border-gray-300 text-gray-900 hover:bg-gray-200'
            }`}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen ${isDark ? 'bg-[#0a0e27]' : 'bg-gray-50'}`}>
      <Sidebar onLogout={handleLogout} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className={`px-8 py-6 border-b ${
          isDark ? 'bg-[#1a1f3a] border-[#2a3150]' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {view === 'list' ? 'Passwords' : editing ? 'Edit' : 'New Password'}
              </h2>
              {view === 'list' && (
                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  {passwords.length} stored
                </p>
              )}
            </div>
            {view === 'list' && (
              <button 
                onClick={() => { setEditing(null); setView('form'); }} 
                className={`font-semibold px-6 py-2.5 rounded-lg transition ${
                  isDark 
                    ? 'bg-gradient-to-r from-[#00d9ff] to-[#7b2ff7] text-white hover:opacity-90' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90'
                }`}
              >
                + New
              </button>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          {view === 'list' ? (
            <PasswordList
              passwords={passwords}
              onEdit={(e) => { setEditing(e); setView('form'); }}
              onDelete={async (id) => { 
                if (confirm('Delete this password?')) {
                  await saveToFile(passwords.filter(p => p.id !== id)); 
                }
              }}
              onCopy={(text, field) => {
                navigator.clipboard.writeText(text);
                const el = document.createElement('div');
                el.className = `fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg z-50 font-semibold ${
                  isDark ? 'bg-[#00d9ff] text-[#0a0e27]' : 'bg-green-600 text-white'
                }`;
                el.textContent = `${field} copied!`;
                document.body.appendChild(el);
                setTimeout(() => el.remove(), 2000);
              }}
            />
          ) : (
            <div className="max-w-2xl">
              <PasswordForm
                initialData={editing ? { label: editing.label, email: editing.email, password: editing.password } : undefined}
                isEditing={!!editing}
                onSubmit={handleSubmit}
                onCancel={() => { setView('list'); setEditing(null); }}
              />
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}