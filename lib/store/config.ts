import type { LucideIcon } from 'lucide-react'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface ConfigStore {
  imgLayout: 'table' | 'grid' | 'masonry'
  theme: 'light' | 'dark'
  selected: {
    folder: string
    id: string
  }
  folder: FolderTree[]
  setFolder: (folder: FolderTree[]) => void
  setSelected: (selected: {
    folder: string
    id: string
  }) => void
  setImgLayout: (imgLayout: 'table' | 'grid' | 'masonry') => void
  setTheme: (theme: 'light' | 'dark') => void
}

export interface FolderTree {
  id: string
  name: string
  icon?: LucideIcon
  folder?: string
  children?: FolderTree[]
}
export const useConfigStore = create(persist<ConfigStore>(set => ({
  imgLayout: 'grid',
  theme: 'dark',
  selected: {
    folder: '',
    id: '',
  },
  folder: [],
  setSelected: ({ folder, id }) => set({ selected: { folder, id } }),
  setFolder: folder => set({ folder }),
  setTheme: theme => set({ theme }),
  setImgLayout: imgLayout => set({ imgLayout }),
}), {
  name: 'b2-config-storage',
  storage: createJSONStorage(() => localStorage),
}))
