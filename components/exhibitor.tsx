import { useExhibitorContext } from "@/contexts/exhibitorContext";
import delay from "@/utils/delay";
import postDataWithRetries from "@/utils/request";
import { Exhibitor } from "@/utils/types";
import { useState } from "react";
import Button from "./button";

export default function Exhibitor({
  exhibitor,
  loadingExhibitorAction,
  setLoadingExhibitorAction,
}: {
  exhibitor: Exhibitor;
  loadingExhibitorAction: boolean;
  setLoadingExhibitorAction: (value: boolean) => void;
}) {
  const spaceReserved =
    exhibitor.spaceReserved === "A"
      ? "14' X 20'"
      : exhibitor.spaceReserved === "B"
      ? "11' X 11'"
      : "8' X 8'";

  const status = exhibitor.reservationStatus;

  const { dispatch } = useExhibitorContext();

  function dispatchExhibitor() {
    dispatch({ type: "SET_SELECTED_EXHIBITOR", payload: exhibitor });
  }

  const accessToken = localStorage.getItem("auth_token");

  const accessTokenToPass = accessToken ? accessToken : undefined;

  async function acceptExhibitor() {
    try {
      setLoadingExhibitorAction(true);
      const url = "/exhibitor/accept";
      await postDataWithRetries(
        { identifier: exhibitor.identifier },
        url,
        accessTokenToPass
      );
      dispatch({
        type: "SET_DASH_SUCCESS",
        payload: "Exhibitor reservation successfully accepted",
      });
      await delay(5000);
      dispatch({ type: "SET_DASH_SUCCESS", payload: "" });
      dispatch({
        type: "UPDATE_EXHIBITOR",
        payload: {
          identifier: exhibitor.identifier,
          reservationStatus: "accepted",
        },
      });
    } catch (err: any) {
      console.log(err);
      if (err.code === "ERR_NETWORK") {
        dispatch({
          type: "SET_DASH_ERROR",
          payload: "Could not accept exhibitor reservation! Try again later",
        });
      } else if (err.response.status === 403) {
        localStorage.clear();
        dispatch({ type: "SET_USER", payload: null });
      } else {
        dispatch({
          type: "SET_DASH_ERROR",
          payload: err.response.data.error.message,
        });
      }
      setTimeout(() => {
        dispatch({ type: "SET_DASH_ERROR", payload: "" });
      }, 5000);
    } finally {
      setLoadingExhibitorAction(false);
    }
  }

  async function rejectExhibitor() {
    try {
      setLoadingExhibitorAction(true);
      const url = "/exhibitor/reject";
      await postDataWithRetries(
        { identifier: exhibitor.identifier },
        url,
        accessTokenToPass
      );
      dispatch({
        type: "SET_DASH_SUCCESS",
        payload: "Exhibitor reservation rejected",
      });
      await delay(5000);
      dispatch({ type: "SET_DASH_SUCCESS", payload: "" });
      dispatch({
        type: "UPDATE_EXHIBITOR",
        payload: {
          identifier: exhibitor.identifier,
          reservationStatus: "rejected",
        },
      });
    } catch (err: any) {
      if (err.code === "ERR_NETWORK") {
        dispatch({
          type: "SET_DASH_ERROR",
          payload: "Could not reject exhibitor reservation! Try again later",
        });
      } else if (err.response.status === 403) {
        localStorage.clear();
        dispatch({ type: "SET_USER", payload: null });
      } else {
        dispatch({
          type: "SET_DASH_ERROR",
          payload: err.response.data.error.message,
        });
      }
      setTimeout(() => {
        dispatch({ type: "SET_DASH_ERROR", payload: "" });
      }, 5000);
    } finally {
      setLoadingExhibitorAction(false);
    }
  }

  return (
    <tr key={exhibitor.identifier} className="hover:cursor-pointer">
      <td className="border-b py-4 px-4 opacity-70" onClick={dispatchExhibitor}>
        {exhibitor.name}
      </td>
      <td className="border-b py-4 opacity-70" onClick={dispatchExhibitor}>
        {exhibitor.email}
      </td>
      <td className="border-b py-4 opacity-70" onClick={dispatchExhibitor}>
        TENT {spaceReserved}
      </td>
      <td className="border-b py-4 opacity-70" onClick={dispatchExhibitor}>
        {exhibitor.phoneNumber}
      </td>

      <td className="border-b py-4">
        {status === "pending" ? (
          <div
            className="flex justify-end"
            aria-disabled={loadingExhibitorAction}
          >
            <div onClick={acceptExhibitor}>
              <Button
                text="Accept"
                disabled={loadingExhibitorAction}
                textColor="#1BC5BD"
                backgroundColor="#C9F7F5"
              />
            </div>
            <div
              className="ml-[24px] flex flex-col items-stretch"
              aria-disabled={loadingExhibitorAction}
              onClick={rejectExhibitor}
            >
              <Button
                text="Reject"
                disabled={loadingExhibitorAction}
                textColor="#DC312D"
                backgroundColor="#FFEDED"
              />
            </div>
          </div>
        ) : (
          <StatusButton status={status} />
        )}
      </td>
    </tr>
  );
}

function StatusButton({ status }: { status: string }) {
  const textColor = status === "accepted" ? "#1BC5BD" : "#DC312D";
  const text = status === "accepted" ? "Accepted" : "Rejected";

  return (
    <div className="px-4 py-[0px] rounded-lg text-right text-sm">
      <p style={{ color: textColor }}>{text}</p>
    </div>
  );
}
