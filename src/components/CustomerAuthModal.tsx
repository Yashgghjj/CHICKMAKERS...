import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Phone, Lock, User, Eye, EyeOff, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useCustomerAuth } from '../context/CustomerAuthContext';

interface CustomerAuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
  onSuccess?: () => void;
}

export default function CustomerAuthModal({
  open,
  onClose,
  defaultTab = 'login',
  onSuccess,
}: CustomerAuthModalProps) {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'login' | 'signup'>(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Login fields
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Noida');
  const [address, setAddress] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const { login, signup } = useCustomerAuth();

  if (!open) return null;

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    if (!loginIdentifier.trim() || !loginPassword) {
      setError('Please enter your email, phone, or admin username, and password.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await login({
        identifier: loginIdentifier,
        password: loginPassword,
      });
      if (res.success) {
        onClose();
        if (res.role === 'admin') {
          navigate('/admin');
        } else {
          onSuccess?.();
          navigate(res.redirectTo || '/account');
        }
      } else {
        setError(res.message || 'Invalid credentials.');
      }
    } catch (err) {
      setError((err as Error).message || 'Sign in error');
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !signupPassword || (!email.trim() && !phone.trim())) {
      setError('Please provide your name, password, and at least an email or phone.');
      return;
    }
    if (signupPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await signup({
        name,
        email,
        phone,
        password: signupPassword,
        city,
        address,
      });
      if (res.success) {
        onSuccess?.();
        onClose();
        navigate('/account');
      } else {
        setError(res.message || 'Registration failed.');
      }
    } catch (err) {
      setError((err as Error).message || 'Registration error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white p-6 pb-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 text-[11px] font-semibold mb-2 border border-brand-500/30">
            <Sparkles className="w-3 h-3 text-brand-400" />
            <span>Customer &amp; Admin Sign In</span>
          </div>

          <h3 className="text-xl font-bold font-serif text-white">
            {tab === 'login' ? 'Welcome to ChickMakers' : 'Create Customer Account'}
          </h3>
          <p className="text-xs text-stone-300 mt-0.5">
            {tab === 'login'
              ? 'Sign in to access your portal. Admins and Customers are routed automatically.'
              : 'Register to save delivery addresses and track custom handcrafted blinds'}
          </p>

          {/* Tab Selector */}
          <div className="flex bg-stone-950/70 p-1 rounded-xl mt-4 border border-stone-800">
            <button
              type="button"
              onClick={() => {
                setTab('login');
                setError(null);
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                tab === 'login'
                  ? 'bg-[#E85D26] text-white shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('signup');
                setError(null);
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                tab === 'signup'
                  ? 'bg-[#E85D26] text-white shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {tab === 'login' ? (
            /* ─── CUSTOMER LOGIN FORM ─── */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Email or Phone Number
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. vikram@example.com or 9871234567"
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-stone-700">Password</label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#E85D26] to-[#D94E18] hover:from-[#D94E18] hover:to-[#C43E0D] transition-all duration-200 shadow-md hover:shadow-orange-600/25 active:scale-98 disabled:opacity-50 mt-2"
              >
                {loading ? 'Signing in...' : 'Sign In to Account'}
              </button>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-600 text-[11px] space-y-1.5">
                <div className="font-semibold text-stone-700 text-center">Quick Demo Accounts:</div>
                <div className="flex gap-2 justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginIdentifier('admin@chickmakers.com');
                      setLoginPassword('admin');
                      setError(null);
                    }}
                    className="px-2 py-1 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 font-medium text-[10px] transition"
                  >
                    Fill Admin (admin / admin)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginIdentifier('vikram@example.com');
                      setLoginPassword('customer123');
                      setError(null);
                    }}
                    className="px-2 py-1 rounded bg-stone-200 hover:bg-stone-300 text-stone-800 font-medium text-[10px] transition"
                  >
                    Fill Customer (vikram)
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* ─── CUSTOMER SIGNUP FORM ─── */
            <form onSubmit={handleSignup} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vikram Malhotra"
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Noida / Greater Noida"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Create Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full pl-9 pr-8 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Delivery / Site Address (Optional)
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, flat / house no., society or landmark"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#E85D26] to-[#D94E18] hover:from-[#D94E18] hover:to-[#C43E0D] transition-all duration-200 shadow-md hover:shadow-orange-600/25 active:scale-98 disabled:opacity-50 mt-2"
              >
                {loading ? 'Creating account...' : 'Create Customer Account'}
              </button>
            </form>
          )}

          {/* Security & Role Guarantee Notice */}
          <div className="mt-4 pt-4 border-t border-stone-200/80 flex items-center justify-between text-[11px] text-stone-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Customer Account (Non-Admin)</span>
            </span>
            <span className="text-stone-400">Strict RBAC Enforced</span>
          </div>
        </div>
      </div>
    </div>
  );
}
