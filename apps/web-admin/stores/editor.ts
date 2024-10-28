import { createStore } from "zustand/vanilla";

type EditorState = {
  title: string;
};

type EditorAction = {
  updateTitle: (title: EditorState["title"]) => void;
};

export type EditorStore = EditorState & EditorAction;

export const defaultInitState: EditorState = {
  title: "",
};

export const createEditorStore = (
  initState: EditorState = defaultInitState
) => {
  return createStore<EditorAction & EditorState>((set) => ({
    ...initState,
    updateTitle: (title: EditorState["title"]) => set({ title }),
  }));
};
