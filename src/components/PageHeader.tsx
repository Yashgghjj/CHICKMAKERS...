import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface Breadcrumb {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  action?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, breadcrumbs, action }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-sage-900 via-sage-800 to-brand-900 text-white py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1 text-sm text-stone-400 mb-4 flex-wrap">
            <Link to="/" className="hover:text-white flex items-center gap-1 transition-colors">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-1">
                <ChevronRight className="w-3.5 h-3.5" />
                {b.to ? (
                  <Link to={b.to} className="hover:text-white transition-colors">{b.label}</Link>
                ) : (
                  <span className="text-brand-300">{b.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2 animate-fade-in">{title}</h1>
            {subtitle && <p className="text-stone-300 text-lg animate-fade-in-delay">{subtitle}</p>}
          </div>
          {action}
        </div>
      </div>
    </div>
  );
}
