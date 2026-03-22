import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * Catches render errors in child tree for a friendlier production experience.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-green-600 px-6">
          <div className="max-w-lg rounded-3xl glass-strong p-10 text-center shadow-2xl">
            <AlertTriangle className="mx-auto h-14 w-14 text-amber-300 mb-4" aria-hidden />
            <h1 className="font-display text-2xl font-bold text-white mb-2">Something went wrong</h1>
            <p className="text-white/85 mb-6">
              Please refresh the page. If the problem continues, contact us and we will help right away.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-2xl bg-white px-6 py-3 font-semibold text-blue-700 shadow-xl transition-all duration-300 hover:scale-105"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
