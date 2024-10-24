import { createContext, useContext, useState } from 'react';

interface AuthContextType {
    isLoggedInUser: boolean;
    setIsLoggedInUser: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedInUser, setIsLoggedInUser] = useState<boolean>(false);

    return (
        <AuthContext.Provider value={{ isLoggedInUser, setIsLoggedInUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
