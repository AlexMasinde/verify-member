import { api } from "@/api";
import React, { createContext, useContext, useEffect, useReducer } from "react";

import { AxiosResponse } from "axios";
import { Exhibitor, ExhibitorResponse } from "@/utils/types";

type ExhibitorAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_EXHIBITORS"; payload: ExhibitorResponse[] }
  | { type: "SHOW_MODAL"; payload: boolean }
  | { type: "SET_SELECTED_EXHIBITOR"; payload: Exhibitor };

type ExhibitorContextType = {
  loading: boolean;
  error: string;
  exhibitors: ExhibitorResponse[];
  showModal: boolean;
  selectedExhibitor: Exhibitor;
  dispatch: React.Dispatch<ExhibitorAction>;
};

const initialState: ExhibitorContextType = {
  loading: true,
  error: "",
  exhibitors: [],
  showModal: false,
  selectedExhibitor: {
    email: "",
    phoneNumber: "",
    contactPerson: "",
    description: "",
    spaceReserved: "",
    createdAt: "",
    updatedAt: "",
    publishedAt: "",
    name: "",
    reservationStatus: "",
    identifier: "",
  },
  dispatch: () => {},
};

const ExhibitorContext = createContext<ExhibitorContextType>(initialState);

export function useExhibitorContext() {
  return useContext(ExhibitorContext);
}

function exhibitorsReducer(
  state: ExhibitorContextType,
  action: ExhibitorAction
): ExhibitorContextType {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_EXHIBITORS":
      return { ...state, exhibitors: action.payload };
    case "SHOW_MODAL":
      return { ...state, showModal: action.payload };
    case "SET_SELECTED_EXHIBITOR":
      return { ...state, selectedExhibitor: action.payload, showModal: true };
    default:
      return state;
  }
}

export default function ExhibitorContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(exhibitorsReducer, initialState);
  const value: ExhibitorContextType = {
    ...state,
    dispatch,
  };

  useEffect(() => {
    async function fetchExhibitors() {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const response = await api.get<{ data: ExhibitorResponse[] }>(
          "/exhibitors"
        );
        const exhibitorsArray: ExhibitorResponse[] = response.data.data;
        dispatch({ type: "SET_EXHIBITORS", payload: exhibitorsArray });
      } catch (err) {
        console.log(err);
        dispatch({
          type: "SET_ERROR",
          payload: "Could not fetch exhibitors: Try again later",
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }
    fetchExhibitors();
  }, []);

  return (
    <ExhibitorContext.Provider value={value}>
      {children}
    </ExhibitorContext.Provider>
  );
}
