import { useEffect, useState, createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const username = localStorage.getItem('username');
        console.log("AuthContext username:", username);

        if (username) {
            setUser(username);
        }

        setLoading(false); // Done checking localStorage
    }, []);

    return ( 
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
     );
}
