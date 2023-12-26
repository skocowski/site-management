import { createContext, Dispatch, SetStateAction } from "react";

interface StateContextProps {
  state: boolean;
  changeState: Dispatch<SetStateAction<boolean>>;
}

export const StateContext = createContext<StateContextProps | undefined>(
  undefined
);

/* import { createContext } from "react";

export const StateContext = createContext({}); */
