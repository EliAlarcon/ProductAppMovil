import { create } from "zustand";
import { User } from "../../../domain/entities/user";
import { AuthStatus } from "../../../infraestructure/interface/auth.status";
import { autLogin, authCheckStatus } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../../config/adapters/storage-adapter";

export interface AuthState {
  status: AuthStatus;
  user?: User;
  token?: string;
  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
}

//Definir el store
export const useAuthStore = create<AuthState>()((set, get) => ({
  //Voy a ir cambiando el estado de autenticación
  status: "checking",
  user: undefined,
  token: undefined,
  login: async (email: string, password: string) => {
    const resp = await autLogin(email, password);
    if (!resp) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      return false;
    }
    //TODO: Save token and user in storage
    //console.log(resp);
    await StorageAdapter.setItem("token", resp.token);
    //Verificar token storage
    //const storeToken = await StorageAdapter.getItem('token');
    //console.log(storeToken);

    //Si se logró autenticar
    set({ status: "authenticated", token: resp.token, user: resp.user });
    return true;
  },
  checkStatus: async () => {
    const resp = await authCheckStatus();
    if (!resp) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      return;
    }
    await StorageAdapter.setItem("token", resp.token);
    set({ status: "authenticated", token: resp.token, user: resp.user });
  },
}));
