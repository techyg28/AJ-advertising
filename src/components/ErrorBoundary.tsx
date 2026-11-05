import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  userFacingMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    userFacingMessage: ''
  };

  public static getDerivedStateFromError(_: Error): State {
    // Render fallback UI with generic safe message
    return {
      hasError: true,
      userFacingMessage: 'A momentary application issue occurred. Our security systems have isolated this component.'
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log full error details securely server-side / in console for engineering analysis
    // Note: NEVER render error.stack, errorInfo.componentStack, or file paths in the DOM
    console.error('SECURE_AUDIT_LOG [Component Crash Isolated]:', {
      timestamp: new Date().toISOString(),
      name: error.name,
      message: error.message,
      componentStack: errorInfo.componentStack
    });
  }

  private handleReset = () => {
    this.setState({ hasError: false, userFacingMessage: '' });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] w-full flex items-center justify-center p-6 bg-[#111111] text-white">
          <div className="max-w-md w-full p-8 rounded-3xl bg-neutral-900 border border-neutral-800 text-center shadow-2xl space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FF3B30]/10 text-[#FF3B30] border border-[#FF3B30]/20 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-white">
              {this.props.fallbackTitle || 'Service Temporarily Unavailable'}
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {this.props.fallbackMessage || this.state.userFacingMessage}
            </p>
            <div className="pt-2">
              <button
                onClick={this.handleReset}
                className="px-6 py-2.5 rounded-xl bg-[#FF3B30] hover:bg-[#E0261B] text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-lg shadow-[#FF3B30]/25"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
