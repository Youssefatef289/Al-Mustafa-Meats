import { create } from "zustand"

interface UiState {
  categoriesPickerOpen: boolean
  setCategoriesPickerOpen: (open: boolean) => void
}

export const useUiStore = create<UiState>((set) => ({
  categoriesPickerOpen: false,
  setCategoriesPickerOpen: (open) => set({ categoriesPickerOpen: open }),
}))
