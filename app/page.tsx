'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './providers/ThemeProvider';

function LandingContent() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'bg-[#0a0e27] text-white' : 'bg-white text-gray-900'}`}>
      {/* Navbar */}
      <nav className={`w-full border-b sticky top-0 z-50 backdrop-blur-sm bg-opacity-90 transition-colors ${
        isDark ? 'bg-[#1a1f3a] border-[#2a3150]' : 'bg-white/90 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <i className={`fas fa-shield-alt text-2xl ${isDark ? 'text-[#00d9ff]' : 'text-blue-600'}`}></i>
            <Link href="/" className="text-xl font-bold hover:opacity-80 transition">
              Altron
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="font-medium hover:opacity-70 transition">Features</a>
            <a href="#how-it-works" className="font-medium hover:opacity-70 transition">How It Works</a>
            <a href="#faq" className="font-medium hover:opacity-70 transition">FAQ</a>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/auth"
              className={`px-5 py-2 rounded-lg font-medium transition ${
                isDark 
                  ? 'bg-gradient-to-r from-[#00d9ff] to-[#7b2ff7] text-white hover:opacity-90' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90'
              }`}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="relative z-10 text-center">
            <div className="mb-8">
              <i className={`fas fa-shield-alt ${isDark ? 'text-[#00d9ff]' : 'text-blue-600'}`} style={{ fontSize: '80px' }}></i>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Your Passwords,<br/>
              <span className={`bg-gradient-to-r ${
                isDark 
                  ? 'from-[#00d9ff] to-[#7b2ff7]' 
                  : 'from-blue-600 to-purple-600'
              } bg-clip-text text-transparent`}>
                100% Local & Secure
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Generate, store, and manage passwords with military-grade encryption. 
              Everything stays on your device. No cloud. No servers. No tracking.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/auth"
                className={`px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 transition ${
                  isDark 
                    ? 'bg-gradient-to-r from-[#00d9ff] to-[#7b2ff7] text-white hover:opacity-90' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90'
                }`}
              >
                <i className="fas fa-rocket"></i> Launch Altron
              </Link>
              
              <a
                href="#features"
                className={`px-8 py-4 rounded-lg font-semibold text-lg border-2 transition ${
                  isDark 
                    ? 'bg-[#1a1f3a] border-[#2a3150] hover:bg-[#252b4a]' 
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
              >
                Learn More
              </a>
            </div>
            
            <p className={`mt-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <i className={`fas fa-check-circle ${isDark ? 'text-[#00d9ff]' : 'text-blue-600'}`}></i> Free & Open Source
              <span className="mx-2">•</span>
              <i className={`fas fa-check-circle ${isDark ? 'text-[#00d9ff]' : 'text-blue-600'}`}></i> No Installation Required
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-20 ${isDark ? 'bg-[#1a1f3a]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Features</h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Built with security and privacy as the foundation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: 'fa-lock',
                title: '100% Local Storage',
                desc: 'All your passwords are stored locally on your device. No cloud sync, no servers, no data transmission.'
              },
              {
                icon: 'fa-shield-alt',
                title: 'AES-256 Encryption',
                desc: 'Military-grade encryption using AES-256-GCM. The same standard used by banks and governments worldwide.'
              },
              {
                icon: 'fa-eye-slash',
                title: 'Zero Knowledge',
                desc: 'Your master key never leaves your device. We can\'t access your passwords even if we wanted to.'
              },
              {
                icon: 'fa-dice',
                title: 'Strong Password Generator',
                desc: 'Create cryptographically secure passwords up to 64 characters with custom character sets and strength meter.'
              },
              {
                icon: 'fa-palette',
                title: '6 Beautiful Themes',
                desc: 'Choose from Light, Dark, VS Code, Monokai, Solarized, and Neon themes. Your style, your choice.'
              },
              {
                icon: 'fa-wifi-slash',
                title: 'Works Offline',
                desc: 'No internet connection required. Generate and manage passwords anywhere, anytime, completely offline.'
              },
              {
                icon: 'fa-search',
                title: 'Quick Search',
                desc: 'Find your passwords instantly with real-time search. No more scrolling through endless lists.'
              },
              {
                icon: 'fa-code',
                title: 'Open Source',
                desc: 'Fully transparent code. Inspect, audit, or modify as you wish. No hidden backdoors or tracking.'
              },
              {
                icon: 'fa-mobile-alt',
                title: 'Responsive Design',
                desc: 'Works seamlessly on desktop, tablet, and mobile. Manage your passwords from any device.'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-6 border-2 transition-all hover:scale-105 ${
                  isDark 
                    ? 'bg-[#0a0e27] border-[#2a3150] hover:border-[#00d9ff]' 
                    : 'bg-white border-gray-200 hover:border-blue-400'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                  isDark ? 'bg-[#00d9ff]' : 'bg-blue-600'
                }`}>
                  <i className={`fas ${feature.icon} text-2xl ${isDark ? 'text-[#0a0e27]' : 'text-white'}`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Get started in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: 'Choose Storage',
                desc: 'Select a secure folder on your computer where encrypted passwords will be saved.'
              },
              {
                step: 2,
                title: 'Set Master Key',
                desc: 'Create a strong master key that encrypts all your passwords. Remember it well!'
              },
              {
                step: 3,
                title: 'Start Generating',
                desc: 'Generate strong passwords, save them securely, and never worry about password security again.'
              }
            ].map((step) => (
              <div
                key={step.step}
                className={`rounded-xl p-8 text-center border-2 transition-all hover:scale-105 ${
                  isDark 
                    ? 'bg-[#1a1f3a] border-[#2a3150] hover:border-[#00d9ff]' 
                    : 'bg-gray-50 border-gray-200 hover:border-blue-400'
                }`}
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                  isDark ? 'bg-[#00d9ff]' : 'bg-blue-600'
                }`}>
                  <span className={`text-4xl font-bold ${isDark ? 'text-[#0a0e27]' : 'text-white'}`}>
                    {step.step}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={`py-20 ${isDark ? 'bg-[#1a1f3a]' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Is my data really secure?',
                a: 'Absolutely. Your passwords are encrypted with AES-256-GCM encryption and stored locally on your device. Your master key never leaves your device, and we have no access to your data.'
              },
              {
                q: 'What if I forget my master key?',
                a: 'Unfortunately, if you forget your master key, your passwords cannot be recovered. This is by design - it ensures that only you can access your passwords. Make sure to choose a memorable master key!'
              },
              {
                q: 'Do I need internet to use this?',
                a: 'No! The app works completely offline. Once you open it in your browser, you can generate and manage passwords without any internet connection.'
              },
              {
                q: 'Which browsers are supported?',
                a: 'The app requires Chrome or Edge browser for the File System Access API. These browsers allow the app to save encrypted files directly to your computer.'
              },
              {
                q: 'Is this really free?',
                a: 'Yes, 100% free and open source. No hidden costs, no subscriptions, no premium features. The entire source code is available for you to inspect and modify.'
              },
              {
                q: 'Can I use this on mobile?',
                a: 'The interface is responsive and works on mobile browsers, but the File System Access API has limited support on mobile. We recommend using it on desktop for the best experience.'
              }
            ].map((faq, idx) => (
              <details
                key={idx}
                className={`rounded-lg p-6 cursor-pointer border-2 transition-all hover:scale-[1.02] ${
                  isDark 
                    ? 'bg-[#0a0e27] border-[#2a3150] hover:border-[#00d9ff]' 
                    : 'bg-white border-gray-200 hover:border-blue-400'
                }`}
              >
                <summary className="font-semibold text-lg cursor-pointer">
                  {faq.q}
                </summary>
                <p className={`mt-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t ${isDark ? 'bg-[#1a1f3a] border-[#2a3150]' : 'bg-gray-50 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 mb-3 justify-center md:justify-start">
                <i className={`fas fa-shield-alt text-2xl ${isDark ? 'text-[#00d9ff]' : 'text-blue-600'}`}></i>
                <span className="font-bold text-xl">Altron</span>
              </div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Local Password Manager
              </p>
            </div>

            <div className="flex items-center gap-8">
              <a href="#features" className={`text-sm font-medium hover:opacity-70 transition ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Features
              </a>
              <a href="#how-it-works" className={`text-sm font-medium hover:opacity-70 transition ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                How It Works
              </a>
              <a href="#faq" className={`text-sm font-medium hover:opacity-70 transition ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                FAQ
              </a>
              <Link href="/dashboard" className={`text-sm font-medium hover:opacity-70 transition ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Dashboard
              </Link>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/srsdesigndev/altron"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:opacity-70 transition ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                title="GitHub"
              >
                <i className="fab fa-github text-2xl"></i>
              </a>
              <a
                href="https://x.com/radnus96"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:opacity-70 transition ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                title="Twitter"
              >
                <i className="fab fa-twitter text-2xl"></i>
              </a>
            </div>
          </div>

          <div className={`border-t pt-8 ${isDark ? 'border-[#2a3150]' : 'border-gray-200'}`}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                © 2025 Altron. Open Source & Free Forever.
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Encrypted Locally • AES-256 • No Cloud Storage
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function LandingPage() {
  return (
    <ThemeProvider>
      <LandingContent />
    </ThemeProvider>
  );
}