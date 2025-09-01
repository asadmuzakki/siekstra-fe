/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";
import type { State } from "../Types/State";

interface GlobalContextType {
  state: State;
  setState: Dispatch<SetStateAction<State>>;
  stateHandle: (stateKey: string, value: any) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Props untuk provider
type GlobalProviderProps = {
  children: ReactNode;
};

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [state, setState] = useState<State>({
    id: "",
    toggle: false,
    showPopup: false,
    post: false,
    update: false,
    delete: false,
    showPopAbsen: false,
  });
  const stateHandle = (stateKey: string, value: any) => {
    setState((prevState) => ({
      ...prevState,
      [stateKey]: value,
    }));
  };

  return (
    <GlobalContext.Provider value={{ state, setState, stateHandle }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook untuk menggunakan GlobalContext
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext harus digunakan di dalam GlobalProvider");
  }
  return context;
};
