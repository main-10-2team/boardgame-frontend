import { create } from 'zustand';

type User = {
  nickname: string;
  phone_number: string;
  profile_image: string | null;
  // ...etc
};

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));