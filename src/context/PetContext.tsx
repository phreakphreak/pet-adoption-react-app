import { Animal, Breed, TypeAnimal } from "@pet/animal";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
  fetchAnimals,
  fetchBreeds,
  fetchSingleType,
} from "../services/PetFinderService";

type Payload =
  | Animal[]
  | Animal
  | TypeAnimal[]
  | Breed[]
  | string
  | null
  | Filter;

type Type = "SET_PETS" | "LOADING" | "ERROR" | "SET_FILTER";

type Action = { type: Type; payload?: Payload };

export type Filter = {
  name?: string;
  breeds?: Breed[];
  type?: TypeAnimal;
};

type Dispatch = (Action: Action) => void;
interface State {
  pets: Animal[];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  isSuccessPets: boolean;
  isSuccessFilters: boolean;
  filters: {
    cat?: Filter;
    dog?: Filter;
  };
}
export type PetProviderProps = { children: React.ReactNode };

export type PetContextProps = {
  state: State;
  dispatch: Dispatch;
};

const PetContext = createContext<PetContextProps | undefined>(undefined);

function petReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_PETS": {
      return {
        ...state,
        pets: action.payload as Animal[],
        isLoading: false,
        isError: false,
        error: null,
        isSuccessPets: true,
      };
    }
    case "LOADING": {
      return {
        ...state,
        pets: [],
        isLoading: true,
        isError: false,
        error: null,
      };
    }

    case "ERROR": {
      return {
        ...state,
        pets: [],
        isLoading: false,
        isError: true,
        error: action.payload as string,
      };
    }

    case "SET_FILTER": {
      const payload = action.payload as Filter;
      return {
        ...state,
        filters: {
          ...state.filters,
          [payload.name as string]: payload,
        },
        isSuccessFilters: true,
      };
    }

    default: {
      return state;
    }
  }
}

const initialState: State = {
  pets: [],
  isLoading: false,
  isError: false,
  error: null,
  isSuccessPets: false,
  isSuccessFilters: false,
  filters: {
    cat: {},
    dog: {},
  },
};

const TypeAnimalOptions = ["cat", "dog"];

function PetProvider({ children }: PetProviderProps) {
  const [state, dispatch] = useReducer(petReducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: "LOADING" });
        const data = await fetchAnimals();
        if (data) {
          dispatch({ type: "SET_PETS", payload: data });
        }

        const proms = TypeAnimalOptions.map(async (single) => {
          const breeds = await fetchBreeds(single);
          const type = await fetchSingleType(single);
          return { breeds, type, name: single };
        });
        const result = await Promise.allSettled(proms);

        result.forEach((item) => {
          if (item.status === "fulfilled") {
            dispatch({ type: "SET_FILTER", payload: item.value });
          }
        });
      } catch (error) {
        let message = "Error Get animals";
        if (error instanceof Error) message = error.message;
        dispatch({ type: "ERROR", payload: message });
      }
    })();
  }, []);

  const value = { state, dispatch };
  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
}

function usePet() {
  const context = useContext(PetContext);
  if (context === undefined) {
    throw new Error("usePet must be within a PetProvider");
  }
  return context;
}

export { PetProvider, usePet };
