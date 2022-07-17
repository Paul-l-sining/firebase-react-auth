import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateEmail, updatePassword } from 'firebase/auth';
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
 
    function login(email:string, password:string) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout(email:string, password:string) {
        return signOut(auth);
    }

    function resetPassword(email:string) {
        return sendPasswordResetEmail(auth, email);
    }

    function changeEmail(email:string) {
        return updateEmail(currentUser, email); 
    }

    function changePassword(newPassword:string) {
        return updatePassword(currentUser, newPassword);
    }

    function googleSignIn() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider); 
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);            
        })

        return unsubscribe;
    }, [currentUser])

    const value = {
        currentUser, 
        signup,
        login,
        logout,
        resetPassword,
        changeEmail,
        changePassword, 
        googleSignIn
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
 
export default AuthProvider;