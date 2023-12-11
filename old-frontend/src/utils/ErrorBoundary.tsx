import React, {ErrorInfo, ReactNode} from 'react';
import {Button, Card, CardContent, Typography} from '@mui/material';

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

    handleTryAgain = () => {
        this.setState({ hasError: false });
        // Aqui você pode adicionar lógica adicional para lidar com a recuperação do erro
    }

    render() {
        if (this.state.hasError && this.state.error && this.state.errorInfo) {
            return (
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Algo deu errado
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Desculpe pelo inconveniente. Por favor, tente novamente.
                        </Typography>
                        <Typography variant="body2" color="error.main">
                            {this.state.error.name}: {this.state.error.message}
                        </Typography>
                        <Typography variant="body2" color="error.main">
                            {this.state.errorInfo.componentStack}
                        </Typography>
                        <Button variant="contained" onClick={this.handleTryAgain}>Tentar Novamente</Button>
                    </CardContent>
                </Card>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
