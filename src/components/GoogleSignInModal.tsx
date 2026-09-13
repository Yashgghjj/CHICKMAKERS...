import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, User, Mail, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function GoogleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.93 6.72-4.93z"
      />
    </svg>
  );
}

interface GoogleSignInModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function GoogleSignInModal({ open, onClose, onSuccess }: GoogleSignInModalProps) {
  const { loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Suggested Google Account (Prefilled with user's detected email)
  const defaultAccount = {
    name: 'Yash',
    email: 'yashji162005@gmail.com',
    avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
  };

  // Custom Account State
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');

  if (!open) return null;

  async function handleGoogleLogin(email: string, name?: string, avatar?: string) {
    if (!email || !email.includes('@')) {
      setError('Please provide a valid Gmail address.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await loginWithGoogle({
        email: email.trim().toLowerCase(),
        name: name?.trim() || email.split('@')[0],
        avatar,
      });

      if (res.success) {
        onSuccess?.();
        onClose();
      } else {
        setError(res.message || 'Unable to sign in with Google. Please try again.');
      }
    } catch (err) {
      setError((err as Error).message || 'Google authentication failed.');
    } finally {
      setLoading(false);
    }
  }

  function handleCustomSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!customEmail.trim()) {
      setError('Please enter your Gmail address.');
      return;
    }
    const cleanEmail = customEmail.trim().toLowerCase();
    const finalEmail = cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@gmail.com`;
    handleGoogleLogin(finalEmail, customName.trim());
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-stone-100 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center shadow-xs">
              <GoogleIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 leading-tight">
                Sign in with Google
              </h3>
              <p className="text-xs text-stone-500">
                to continue to <span className="font-semibold text-stone-700">Bamboo Chick Maker</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
              <X className="w-4 h-4 text-red-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <p className="text-xs text-stone-600">
            Choose a Google account to securely authenticate with your verified profile:
          </p>

          {/* Primary 1-Click Google Account Option */}
          <button
            type="button"
            disabled={loading}
            onClick={() => handleGoogleLogin(defaultAccount.email, defaultAccount.name, defaultAccount.avatar)}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-stone-200 bg-white hover:bg-amber-50/50 hover:border-amber-300 transition-all group text-left shadow-xs hover:shadow-md cursor-pointer disabled:opacity-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                {defaultAccount.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                    {defaultAccount.name}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                    Current
                  </span>
                </div>
                <div className="text-xs text-stone-500">{defaultAccount.email}</div>
              </div>
            </div>
            <div className="flex items-center text-amber-600">
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-amber-600" />
              ) : (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              )}
            </div>
          </button>

          {/* Toggle Custom Gmail Input */}
          {!showCustomInput ? (
            <button
              type="button"
              onClick={() => setShowCustomInput(true)}
              className="w-full py-2.5 px-3.5 text-xs text-stone-600 hover:text-stone-900 border border-dashed border-stone-300 hover:border-stone-400 rounded-2xl flex items-center justify-center gap-2 hover:bg-stone-50 transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-stone-400" />
              <span>Use another Gmail / Google account</span>
            </button>
          ) : (
            <form onSubmit={handleCustomSubmit} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-800">Enter your Gmail address</span>
                <button
                  type="button"
                  onClick={() => setShowCustomInput(false)}
                  className="text-[11px] text-stone-400 hover:text-stone-700"
                >
                  Cancel
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                  Gmail Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="email"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                  Display Name (Optional)
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g. Ramesh Sharma"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <GoogleIcon className="w-4 h-4" />}
                <span>Continue with this Gmail</span>
              </button>
            </form>
          )}

          {/* Privacy & Security Note */}
          <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Google verifies your email and identity. No passwords stored or shared.
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
