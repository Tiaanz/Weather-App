import { create } from 'zustand'

export const useUserStore = create((set) => ({
  currentUser: {
    firstName: '',
    lastName: '',
  },
  setUser: (newUser) =>
    set((state) => ({
      currentUser: {
        ...state.currentUser,
        ...newUser,
      },
    })),
}))
