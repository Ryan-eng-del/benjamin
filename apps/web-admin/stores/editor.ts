import { OutputData } from "@editorjs/editorjs";
import { createStore } from "zustand/vanilla";

type EditorState = {
  title: string;
  content: OutputData | undefined;
};

type EditorAction = {
  updateTitle: (title: EditorState["title"]) => void;
  updateContent: (content: EditorState["content"]) => void;
};

export type EditorStore = EditorState & EditorAction;

export const defaultInitState: EditorState = {
  title: "",
  content: undefined,
};

export const createEditorStore = (
  initState: EditorState = defaultInitState
) => {
  return createStore<EditorAction & EditorState>((set) => ({
    ...initState,
    updateTitle: (title: EditorState["title"]) => set({ title }),
    updateContent: (content: EditorState["content"]) => set({ content }),
  }));
};
