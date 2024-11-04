import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component to wrap the app and provide authentication functionality
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Monitor authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // Register a new user with email, password, and optional username
    const registerUser = async (email, password, username) => {
        setLoading(true);
        setError(null);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            if (username) {
                await updateProfile(userCredential.user, { displayName: username });
            }
            setUser(userCredential.user);
            return userCredential.user;
        } catch (error) {
            handleAuthError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Sign in with email and password
    const signIn = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            return userCredential.user;
        } catch (error) {
            handleAuthError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Sign in with Google
    const signInWithGoogle = async () => {
        setLoading(true);
        setError(null);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            return result.user;
        } catch (error) {
            handleAuthError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Send a password reset email
    const forgotPassword = async (email) => {
        setLoading(true);
        setError(null);
        try {
            await sendPasswordResetEmail(auth, email);
            return "Password reset email sent. Please check your inbox.";
        } catch (error) {
            handleAuthError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Error handler for authentication errors
    const handleAuthError = (error) => {
        console.error("Auth error:", error);
        let errorMessage = "An error occurred during authentication";
        
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = "This email is already registered";
                break;
            case 'auth/invalid-email':
                errorMessage = "Invalid email address";
                break;
            case 'auth/operation-not-allowed':
                errorMessage = "Email/password accounts are not enabled";
                break;
            case 'auth/weak-password':
                errorMessage = "Password should be at least 6 characters";
                break;
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                errorMessage = "Invalid email or password";
                break;
            case 'auth/too-many-requests':
                errorMessage = "Too many failed attempts. Please try again later.";
                break;
            case 'auth/popup-closed-by-user':
                errorMessage = "Google sign-in was cancelled";
                break;
            case 'auth/popup-blocked':
                errorMessage = "Google sign-in popup was blocked";
                break;
            default:
                errorMessage = error.message;
        }
        
        setError(errorMessage);
    };

    // Value provided to components that use this context
    const value = {
        user,
        loading,
        error,
        registerUser,
        signIn,
        signInWithGoogle,
        forgotPassword
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
