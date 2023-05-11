import { api } from "@/api";
import React, { createContext, useContext, useEffect, useReducer } from "react";

import { Exhibitor, UpdateExhibitor, UserObject } from "@/utils/types";
import AppLoading from "@/components/appLoading";

type ExhibitorAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_EXHIBITORS"; payload: Exhibitor[] }
  | { type: "SHOW_MODAL"; payload: boolean }
  | { type: "SET_SELECTED_EXHIBITOR"; payload: Exhibitor }
  | { type: "SET_DASH_ERROR"; payload: string }
  | { type: "SET_DASH_SUCCESS"; payload: string }
  | { type: "UPDATE_EXHIBITOR"; payload: UpdateExhibitor }
  | { type: "APP_LOADING"; payload: boolean }
  | { type: "SET_USER"; payload: UserObject | null };

type ExhibitorContextType = {
  loading: boolean;
  error: string;
  appLoading: boolean;
  exhibitors: Exhibitor[];
  showModal: boolean;
  user: UserObject | null;
  selectedExhibitor: Exhibitor;
  dashSuccess: string;
  dashError: string;
  dispatch: React.Dispatch<ExhibitorAction>;
};

const initialState: ExhibitorContextType = {
  loading: true,
  error: "",
  exhibitors: [],
  user: null,
  showModal: false,
  appLoading: true,
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
  dashError: "",
  dashSuccess: "",
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
    case "SET_DASH_ERROR":
      return { ...state, dashError: action.payload };
    case "SET_DASH_SUCCESS":
      return { ...state, dashSuccess: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "APP_LOADING":
      return { ...state, appLoading: action.payload };
    case "UPDATE_EXHIBITOR":
      const updatedExhibitor = action.payload;
      const newExhibitors = state.exhibitors.map((exhibitor) => {
        if (exhibitor.identifier === updatedExhibitor.identifier) {
          return {
            ...exhibitor,
            reservationStatus: updatedExhibitor.reservationStatus,
          };
        }
        return exhibitor;
      });
      return { ...state, exhibitors: newExhibitors };

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
    async function getUser() {
      try {
        const userToken = localStorage.getItem("auth_token");

        if (!userToken) {
          return dispatch({ type: "APP_LOADING", payload: false });
        }

        const url = "/users/me";

        const response = await api.get(url, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        const userData = response.data;

        const userObject: UserObject = {
          name: userData.username,
          email: userData.email,
        };
        dispatch({
          type: "SET_USER",
          payload: userObject,
        });
      } catch (err) {
        console.log(err);
      } finally {
        dispatch({ type: "APP_LOADING", payload: false });
      }
    }

    getUser();
  }, []);

  return (
    <ExhibitorContext.Provider value={value}>
      {children}
    </ExhibitorContext.Provider>
  );
}
