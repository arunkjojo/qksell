import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { VerificationState } from '@common/types';

interface OTPVerificationStatusProps {
    state: VerificationState;
}

export const OTPVerificationStatus = ({ state }: OTPVerificationStatusProps) => {
    if (state.status === 'idle') {
        return null;
    }

    const statusColors = {
        loading: 'text-blue-500',
        success: 'text-green-500',
        error: 'text-red-500',
    };

    const statusIcon = {
        loading: <Loader2 className="animate-spin mr-2 h-5 w-5" />,
        success: <CheckCircle className="mr-2 h-5 w-5" />,
        error: <AlertCircle className="mr-2 h-5 w-5" />,
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={state.status}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center mt-4 ${statusColors[state.status as keyof typeof statusColors]}`}
            >
                {statusIcon[state.status as keyof typeof statusIcon]}
                <span>{state.message}</span>
            </motion.div>
        </AnimatePresence>
    );
};