import { useState, FormEvent } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AnimatedLogo from '../../components/AnimatedLogo';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/admin';

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please enter your admin credentials.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setError(res.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError((err as Error).message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  }

  function handleDemoFill() {
    setEmail('admin@chickmakers.com');
    setPassword('admin');
    setError(null);
  }

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Assam Bamboo Texture / Ambient Accent */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <AnimatedLogo size="lg" variant="dark" showSubtitle={false} showIcon={true} />
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" /> Artisan Control Panel
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white font-serif">
            Sign In to Admin Portal
          </h2>
          <p className="mt-1 text-xs text-stone-400">
            Manage bamboo orders, live catalogue, measurements &amp; revenue
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-sage-950/80 backdrop-blur-md py-8 px-6 sm:px-10 shadow-2xl rounded-2xl border border-sage-800">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1.5">
                Admin Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@chickmakers.com or shiva"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-stone-900 border border-sage-800 rounded-xl text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-stone-300">
                  Password
                </label>
                <span className="text-[11px] text-stone-500">Default: admin</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-10 py-2.5 bg-stone-900 border border-sage-800 rounded-xl text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition"
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
              className="w-full mt-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sign In as Shiva / Admin</span>
                </>
              )}
            </button>
          </form>

          {/* 1-Click Demo Login Helper */}
          <div className="mt-6 pt-5 border-t border-sage-800 text-center">
            <button
              type="button"
              onClick={handleDemoFill}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-sage-800 text-xs text-amber-300 font-medium transition"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Fill Demo Credentials (admin / admin)</span>
            </button>
          </div>
        </div>

        {/* Return to store link */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-400 hover:text-amber-300 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Customer Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
