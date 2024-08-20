/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from 'react';

// Create Context
const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState("");

    return (
        <ErrorContext.Provider value={{ error, setError }}>
            {children}
        </ErrorContext.Provider>
    );
};

// Custom hook to use the Error Context
export const useError = () => {
    return useContext(ErrorContext);
};
