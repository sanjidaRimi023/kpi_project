import { create } from 'zustand';

export const usePaperStore = create((set) => ({
  sections: [],
  
  addSection: (title = "New Section") => set((state) => ({
    sections: [...state.sections, { id: Date.now(), title, questions: "", marks: "" }]
  })),

  updateSection: (id, field, value) => set((state) => ({
    sections: state.sections.map(s => s.id === id ? { ...s, [field]: value } : s)
  })),

  removeSection: (id) => set((state) => ({
    sections: state.sections.filter(s => s.id !== id)
  })),

  clearPaper: () => set({ sections: [] }),
}));