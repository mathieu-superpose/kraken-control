import { create } from "zustand"

interface GameState {
  soundOn: boolean
  switchSound: () => void
}

export const useGame = create<GameState>((set) => ({
  soundOn: false,

  switchSound: () => set((state) => ({ soundOn: !state.soundOn })),
}))
