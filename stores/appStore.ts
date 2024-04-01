import { LOCAL_STORAGE } from "@/app/constants";
import { create } from "zustand";

interface AppState {
  chatApiToken: null | string;
  setChatApiToken: (chatApiToken: string) => void;
}
const chatApiTokenInitial = localStorage?.getItem(LOCAL_STORAGE.CHAT_API_TOKEN);

export const useAppStore = create<AppState>()((set) => ({
  chatApiToken: chatApiTokenInitial,
  setChatApiToken: (token: string) => set(() => ({ chatApiToken: token })),
}));
