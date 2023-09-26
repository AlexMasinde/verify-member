import { api } from "@/api";
import React, { createContext, useContext, useEffect, useReducer } from "react";

import { UpdateExhibitor, UserObject } from "@/utils/types";

type ExhibitorAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_DASH_ERROR"; payload: string }
  | { type: "SET_DASH_SUCCESS"; payload: string }
  | { type: "UPDATE_EXHIBITOR"; payload: UpdateExhibitor }
  | { type: "APP_LOADING"; payload: boolean }
  | { type: "SET_USER"; payload: UserObject | null };

type ExhibitorContextType = {
  loading: boolean;
  error: string;
  appLoading: boolean;
  user: UserObject | null;
  dashSuccess: string;
  dashError: string;
  dispatch: React.Dispatch<ExhibitorAction>;
};

const initialState: ExhibitorContextType = {
  loading: true,
  error: "",
  user: null,
  appLoading: true,
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
    case "SET_DASH_ERROR":
      return { ...state, dashError: action.payload };
    case "SET_DASH_SUCCESS":
      return { ...state, dashSuccess: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "APP_LOADING":
      return { ...state, appLoading: action.payload };

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
          authToken: userToken,
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
