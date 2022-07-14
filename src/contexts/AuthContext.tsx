import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { auth } from '../firebase';



const AuthContext = React.createContext<any>(null);

export function useAuth() {
    return useContext(AuthContext);
}


interface AuthProviderProps {
    children: any;
}
 
const AuthProvider = ({ children } : AuthProviderProps) => {
    

    const [currentUser, setCurrentUser] = useState<any>(null);

    function signup(email:string, password:string) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        })

        return unsubscribe;
    }, [])

    const value = {
        currentUser, 
        signup
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
 
export default AuthProvider;