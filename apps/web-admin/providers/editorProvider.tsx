"use client";
import { type EditorStore, createEditorStore } from "@/stores/editor";
import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

export type EditorStoreApi = ReturnType<typeof createEditorStore>;

export const EditorStoreContext = createContext<EditorStoreApi | undefined>(
  undefined
);

export interface EditorStoreProviderProps {
  children: ReactNode;
}

export const EditorStoreProvider = ({ children }: EditorStoreProviderProps) => {
  const storeRef = useRef<EditorStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createEditorStore();
  }
  return (
    <EditorStoreContext.Provider value={storeRef.current}>
      {children}
    </EditorStoreContext.Provider>
  );
};

export const useEditorStore = <T,>(selector: (store: EditorStore) => T): T => {
  const editorStoreContext = useContext(EditorStoreContext);

  if (!editorStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(editorStoreContext, selector);
};
