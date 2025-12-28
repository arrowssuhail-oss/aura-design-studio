
import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background p-4">
                    <div className="w-full max-w-md rounded-lg border border-destructive/20 bg-destructive/5 p-6 shadow-xl">
                        <div className="flex items-center gap-3 text-destructive">
                            <AlertTriangle className="h-6 w-6" />
                            <h2 className="text-lg font-semibold">Something went wrong</h2>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                            An error occurred while rendering this component.
                        </p>
                        <div className="mt-4 rounded bg-background/50 p-2 font-mono text-xs text-destructive overflow-auto max-h-48 border border-border">
                            {this.state.error?.toString()}
                        </div>
                        <button
                            className="mt-4 rounded bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => window.location.reload()}
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
