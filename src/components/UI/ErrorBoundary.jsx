import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  handleReload = () => {
    localStorage.clear(); // Clear storage on crash as it's often a source of corruption
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 text-4xl mb-8 animate-pulse">
            <i className="bi bi-exclamation-triangle"></i>
          </div>
          <h1 className="text-3xl font-black text-white mb-4 tracking-tight uppercase">System Exception</h1>
          <p className="text-gray-400 max-w-md mb-8 leading-relaxed font-medium">
            We encountered a critical runtime error. This sometimes happens due to stale data or unexpected system states.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-500/20"
            >
              Refresh Page
            </button>
            <button
              onClick={this.handleReload}
              className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl transition-all"
            >
              Reset & Fix System
            </button>
          </div>
          <div className="mt-12 p-4 bg-red-500/5 border border-red-500/10 rounded-lg max-w-2xl w-full text-left overflow-auto">
            <p className="text-[10px] text-red-400 font-mono break-all opacity-50">
              Error Hash: {this.state.error?.message || 'Unknown Runtime Error'}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
