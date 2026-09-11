import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
  AlertCircle,
  Sparkles,
  LockKeyhole,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AnimatedLogo from '../components/AnimatedLogo';
import PageTransition from '../components/PageTransition';

interface LoginPageProps {
  defaultTab?: 'login' | 'signup';
}

export default function LoginPage({ defaultTab = 'login' }: LoginPageProps) {
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get('returnUrl');
  const navigate = useNavigate();

  const { user, role, login, signup } = useAuth();

  const [tab, setTab] = useState<'login' | 'signup'>(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Sign In inputs
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  // Sign Up inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Noida');
  const [address, setAddress] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  // If already logged in, redirect based on active role
  useEffect(() => {
    if (user && role) {
      if (returnUrl && returnUrl.startsWith('/admin') && role === 'admin') {
        navigate(returnUrl, { replace: true });
      } else if (role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate(returnUrl && !returnUrl.startsWith('/admin') ? returnUrl : '/account', { replace: true });
      }
    }
  }, [user, role, returnUrl, navigate]);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    if (!identifier.trim() || !password) {
      setError('Please provide your Email/Phone/Username and Password.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await login(identifier, password);
      if (res.success && res.role) {
        if (res.role === 'admin') {
          // Administrator authenticated: redirect to Admin Panel or requested returnUrl
          const target = returnUrl && returnUrl.startsWith('/admin') ? returnUrl : '/admin';
          navigate(target, { replace: true });
        } else {
          // Customer authenticated: redirect to Customer Portal or storefront returnUrl
          const target = returnUrl && !returnUrl.startsWith('/admin') ? returnUrl : '/account';
          navigate(target, { replace: true });
        }
      } else {
        setError(res.message || 'Invalid credentials. Please verify and try again.');
      }
    } catch (err) {
      setError((err as Error).message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !signupPassword || (!email.trim() && !phone.trim())) {
      setError('Please provide your name, password, and at least an email or phone number.');
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
        navigate('/account', { replace: true });
      } else {
        setError(res.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError((err as Error).message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  }

  function handleFillAdmin() {
    setIdentifier('admin@chickmakers.com');
    setPassword('admin');
    setError(null);
  }

  function handleFillCustomer() {
    setIdentifier('vikram@example.com');
    setPassword('customer123');
    setError(null);
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <div className="flex justify-center mb-5">
            <AnimatedLogo size="lg" variant="dark" showSubtitle={false} showIcon={true} />
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Unified Authentication Portal
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-serif">
              {tab === 'login' ? 'Sign In to Your Account' : 'Create Customer Account'}
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-stone-400">
              {tab === 'login'
                ? 'One single sign-in for Customers and Administrators'
                : 'Register as a customer to track custom orders & measurements'}
            </p>
          </div>
        </div>

        <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <div className="bg-stone-950/80 backdrop-blur-md py-7 px-6 sm:px-8 shadow-2xl rounded-3xl border border-stone-800">
            {/* Tab Selector */}
            <div className="flex bg-stone-900 p-1 rounded-xl mb-6 border border-stone-800">
              <button
                type="button"
                onClick={() => {
                  setTab('login');
                  setError(null);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  tab === 'login'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
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
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  tab === 'signup'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {tab === 'login' ? (
              /* ─── COMMON LOGIN FORM ─── */
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Email, Phone Number, or Admin Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g. vikram@example.com or admin"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-stone-100 placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-stone-300">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-stone-100 placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-200 transition"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition duration-200 active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <>
                      <LockKeyhole className="w-4 h-4" />
                      <span>Sign In</span>
                    </>
                  )}
                </button>

                {/* 1-Click Quick Testing Helpers */}
                <div className="mt-5 pt-4 border-t border-stone-800 text-center">
                  <p className="text-[11px] text-stone-400 mb-2 font-medium">Quick Demo Sign-In:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleFillAdmin}
                      className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>Admin Demo</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleFillCustomer}
                      className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                    >
                      <User className="w-3.5 h-3.5 text-stone-400" />
                      <span>Customer Demo</span>
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              /* ─── COMMON SIGNUP FORM ─── */
              <form onSubmit={handleSignup} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikram Malhotra"
                      className="w-full pl-9 pr-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className="w-full pl-9 pr-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="9876543210"
                        className="w-full pl-9 pr-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Noida"
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Create Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="Min 6 chars"
                        className="w-full pl-9 pr-8 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Delivery / Fitting Address (Optional)
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Flat / house no., society or landmark"
                    className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition duration-200 active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? 'Creating Account...' : 'Create Customer Account'}
                </button>
              </form>
            )}

            {/* Role-Based Access Control Assurance Footer */}
            <div className="mt-5 pt-4 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Backend RBAC</span>
              </span>
              <span className="text-stone-500">Auto-routed by role</span>
            </div>
          </div>

          {/* Return to website */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-400 hover:text-amber-300 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Storefront</span>
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
