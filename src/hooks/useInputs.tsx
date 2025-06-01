import { useState } from 'react';

const useAlphabetInput = (initialValue: string = '') => {
    const [value, setValue] = useState(initialValue);

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const inputValue = e.currentTarget.value;
        const alphabetValue = inputValue.replace(/[^A-Za-z\s.-]/g, '')
        setValue(alphabetValue);
    };

    return [value, handleInputChange] as const;  // Return the value and the input handler
};

const useNumericInput = (initialValue: string = '') => {
    const [value, setValue] = useState(initialValue);

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const inputValue = e.currentTarget.value;
        const numericValue = inputValue.replace(/[^0-9]/g, '');
        setValue(numericValue);
    };

    return [value, handleInputChange] as const;  // Return the value and the input handler
};

export {
    useAlphabetInput,
    useNumericInput
};