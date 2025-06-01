import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface ErrorAlertProps {
    status?: string;
    message: string;
    isGoHome?: boolean
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, status = 'Warning', isGoHome = true }) => {
    return (
        <div className="container mx-auto px-4 py-12 text-center">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                <h2 className="text-2xl font-bold">{status}:</h2>
                <p className="text-lg">{message}</p>
            </div>
            {isGoHome && (
                <Link
                    to="/"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Home
                </Link>
            )}
        </div>
    );
};

export default ErrorAlert;
