import AsyncStorage from "@react-native-async-storage/async-storage";
import { Usuario } from "../../types/Auth/usuario";
import { createContext, useEffect, useState, ReactNode } from "react";

export type AuthContextType = {
  user: Usuario | null;
  token: string | null;
  login: (data: { user: Usuario; token: string }) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    carregarUsuario();
  }, []);

  async function carregarUsuario() {
    try {
      const tokenStorage = await AsyncStorage.getItem("@token");
      const userStorage = await AsyncStorage.getItem("@user");

      if (tokenStorage && userStorage) {
        setToken(tokenStorage);
        setUser(JSON.parse(userStorage));
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
    }
  }

  async function login(data: { user: Usuario; token: string }) {
    setUser(data.user);
    setToken(data.token);
    
    await AsyncStorage.setItem("@token", data.token);
    await AsyncStorage.setItem("@user", JSON.stringify(data.user));
  }

  async function logout() {
    setUser(null);
    setToken(null);

    await AsyncStorage.removeItem("@token");
    await AsyncStorage.removeItem("@user");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}