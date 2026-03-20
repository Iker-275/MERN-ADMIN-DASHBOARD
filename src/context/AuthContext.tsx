import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/api";
import { authService } from "../api/AuthApi";


interface User {
  _id: string;
  email: string;
  role: string;
  active: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  loading: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  signupUser:(email:string,password:string)=>Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: any) {
   

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [loading, setLoading] = useState(true);

  // =========================
  // LOGIN
  // =========================
  const login = (token: string, user: User) => {
    
    localStorage.setItem("token", token);

    setToken(token);
    setUser(user);

  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    setLoading(true)

    localStorage.removeItem("token");

    setUser(null);
    setToken(null);
setLoading(false)
  };
  

const loginUser = async (email: string, password: string) => {
  setLoading(true)
  const res = await authService.login(email, password);
  

  login(res.token, res.user);
   if(res.token){
    alert("Success")
    
  }
  setLoading(false)
};

const signupUser = async (email: string, password: string) => {
  setLoading(true)
  const res = await authService.signup(email, password);
  
  

  login(res.token, res.user);
  if(res.token){
    alert("Success")
    

  }
  setLoading(false)
};

const getUserFromToken = (token: string): User | null => {
  try {
    const decoded: any = jwtDecode(token);

    return {
      _id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      active: decoded.active,
    };
  } catch {
    return null;
  }
};

  // =========================
  // TOKEN EXPIRATION CHECK
  // =========================
  useEffect(() => {

    if (!token) {
      setLoading(false);
      return;
    }

    try {

      const decoded: any = jwtDecode(token);

      const expiry = decoded.exp * 1000;

      if (Date.now() > expiry) {
        logout();
      } else {
        
      // ✅ RESTORE USER HERE
      const restoredUser = getUserFromToken(token);
      setUser(restoredUser);

     
      

        const timeout = expiry - Date.now();

        setTimeout(() => {
          logout();
        }, timeout);

      }

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

    } catch {

      logout();

    }

    setLoading(false);

  }, [token]);

  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
        loginUser,
        signupUser

      }}
    >
      {children}
    </AuthContext.Provider>

  );
}