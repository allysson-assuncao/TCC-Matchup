import React, {ErrorInfo, ReactNode} from 'react';
import { Alert, AlertTitle } from '@mui/material';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ errorInfo });
        // Você também pode registrar o erro em um serviço de relatórios de erros
    }

    render() {
        if (this.state.hasError) {
            return (
                <Alert severity="error">
                    <AlertTitle>Algo deu errado</AlertTitle>
                    {this.state.error && this.state.error.toString()}
                    <br />
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                </Alert>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
