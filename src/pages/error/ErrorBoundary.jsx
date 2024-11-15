import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorCode: null };
    }

    static getDerivedStateFromError() {
        return { hasError: false, errorCode: null };
    }

    componentDidCatch(error, info) {
        console.error('ErrorBoundary caught an error', error, info);

        // HTTP 상태 코드가 500 이상인 경우에만 처리
        if (error.response && error.response.status >= 500) {
            this.setState({ hasError: true, errorCode: error.response.status });
        }
    }

    render() {
        if (this.state.hasError) {
            return <Navigate to='/500' replace />;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
