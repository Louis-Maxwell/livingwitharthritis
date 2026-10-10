import { Component, type ReactNode } from "react";
import { reportError } from "@/lib/errorReporting";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isChunkLoadError, reloadOnce } from "@/lib/chunkRecovery";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  /** Remount/reset when this value changes (typically location.pathname). */
  resetKey?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, _info: { componentStack: string }) {
    // A missing chunk after a deploy is fixed by fetching the new index.html.
    // reloadOnce() is guarded, so a persistent failure falls through to the
    // fallback UI below instead of looping.
    const chunkError = isChunkLoadError(error);
    reportError(chunkError ? "chunk_load" : "react_render", error, { fatal: true });
    if (chunkError) reloadOnce();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.resetKey !== prevProps.resetKey && this.state.hasError) {
      this.setState({ hasError: false, error: null });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback !== undefined ? this.props.fallback : (
          <div className="min-h-[300px] flex items-center justify-center p-12">
            <div className="text-center max-w-md space-y-4">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-destructive" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Something went wrong</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                An unexpected error occurred. Please try again or refresh the page.
              </p>
              <div className="flex gap-3 justify-center pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={this.handleRetry}
                  className="gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Try Again
                </Button>
                <Button
                  size="sm"
                  onClick={() => window.location.reload()}
                >
                  Refresh Page
                </Button>
              </div>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
