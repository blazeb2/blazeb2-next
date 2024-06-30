import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface ConfigStore {
  imgLayout: 'table' | 'grid' | 'masonry'
  theme: 'light' | 'dark'
  setImgLayout: (imgLayout: 'table' | 'grid' | 'masonry') => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useConfigStore = create(persist<ConfigStore>(set => ({
  imgLayout: 'grid',
  theme: 'dark',
  setTheme: theme => set({ theme }),
  setImgLayout: imgLayout => set({ imgLayout }),
}), {
  name: 'b2-config-storage',
  storage: createJSONStorage(() => localStorage),
}))
