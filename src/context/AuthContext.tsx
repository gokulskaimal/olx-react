import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth } from "../services/firebase";

//~ Creating a context for authentication
interface AuthContextType {
  user: User | null;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  //~ Effect to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  //~ Login with google
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  //~ Log out user
  const logout = async () => {
    await signOut(auth);
  };

  //~ Providing the user and authentication functions to the context
  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//~ Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider"); //~ Error if used outside of provider
  }
  return context;
};