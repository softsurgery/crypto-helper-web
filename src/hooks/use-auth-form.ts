import { create } from "zustand";

interface AuthForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  set: (attribute: keyof Omit<AuthForm, "set">, value: string) => void;
  reset: () => void;
}

const AuthFormDefaults: Omit<AuthForm, "set" | "reset"> = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const useAuthForm = create<AuthForm>((set) => ({
  ...AuthFormDefaults,
  set: (attribute: keyof Omit<AuthForm, "set">, value: string) => {
    set((state) => ({
      ...state,
      [attribute]: value,
    }));
  },
  reset: () => {
    set(AuthFormDefaults);
  },
}));
