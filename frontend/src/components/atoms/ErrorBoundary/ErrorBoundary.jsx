import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        ErrorBoundary._error = error;
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by boundary:", error);
        console.error("Component stack:", errorInfo.componentStack);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-6 bg-red-50 border border-red-200 rounded-md">
                    <h2 className="text-lg font-semibold text-red-700 mb-2">Something went wrong</h2>
                    <details className="bg-white p-4 rounded border border-red-100">
                        <summary className="cursor-pointer font-medium mb-2">Error details</summary>
                        <p className="mb-2 text-red-700">{this.state.error && this.state.error.toString()}</p>
                        <pre className="text-sm overflow-auto p-2 bg-gray-50">
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;