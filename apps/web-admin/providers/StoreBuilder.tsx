"use client";
import { createContext, ReactNode, useContext, useRef } from "react";
import { StoreApi, useStore } from "zustand";

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
type StateOnly = any;

export function createProviderStore<StoreType>(
  StoreBuilder: (initState: StateOnly) => StoreApi<StoreType>,
  __NAME__?: string
) {
  type StoreApi = ReturnType<typeof StoreBuilder>;

  const StoreContext = createContext<StoreApi | undefined>(undefined);

  interface ProviderProps {
    children: ReactNode;
    value: Partial<StoreType>;
  }

  const StoreProvider = ({ children, value }: ProviderProps) => {
    const store = StoreBuilder(value);
    const storeRef = useRef<StoreApi>(store);
    return (
      <StoreContext.Provider value={storeRef.current}>
        {children}
      </StoreContext.Provider>
    );
  };

  const useFactoryStore = <T,>(selector: (store: StoreType) => T): T => {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error(`${__NAME__ || ""} 👈 Store Must Use in Provider！`);
    }
    return useStore(store, selector);
  };
  return {
    StoreProvider,
    useFactoryStore,
  };
}

// 直接 set({ value: newValue }) 的类型
type ImmiateValue<T> = Partial<T>;
// 用Draft的修改方式 set(draft => draft.value = newValue)
type Draft2Modify<T> = (draft: T) => void;

export type ImmerSuportModifyMethod<T> = ImmiateValue<T> | Draft2Modify<T>;
export type ImmerSetter<Store> = (
  modified: ImmerSuportModifyMethod<Store>
) => void;
