import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('ErrorBoundary caught an error', error, info);
    }

    render() {
        if (this.state.hasError) {
            return <Navigate to='/500' replace />;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
