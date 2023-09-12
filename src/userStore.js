import { create } from 'zustand'

//test comments2
export const useUserStore = create((set) => ({
  currentUser: {
    id:0,
    firstName: '',
    lastName: '',
    favCities:[]
  },
  setUser: (newUser) =>
    set((state) => ({
      currentUser: {
        ...state.currentUser,
        ...newUser,
      },
    })),
}))
