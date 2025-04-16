import { useEffect, useState, createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        console.log("AuthContext userid:", userId);

        if (userId) {
            setUser(userId);
        }

        setLoading(false); // Done checking localStorage
    }, []);

    return ( 
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
     );
}
