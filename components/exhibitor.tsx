import { useExhibitorContext } from "@/contexts/exhibitorContext";
import delay from "@/utils/delay";
import { postDataWithRetries } from "@/utils/request";
import { Exhibitor } from "@/utils/types";

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
      setLoadingExhibitorAction(false);
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
      setLoadingExhibitorAction(false);
      dispatch({
        type: "UPDATE_EXHIBITOR",
        payload: {
          identifier: exhibitor.identifier,
          reservationStatus: "rejected",
        },
      });
      await delay(4000);
      dispatch({ type: "SET_DASH_SUCCESS", payload: "" });
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
      setLoadingExhibitorAction(false);
      setTimeout(() => {
        dispatch({ type: "SET_DASH_ERROR", payload: "" });
      }, 4000);
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
          <div className="flex justify-end">
            <div
              onClick={acceptExhibitor}
              className={`${
                loadingExhibitorAction ? "opacity-80" : ""
              } bg-[#C9F7F5] text-[#1BC5BD] px-8 rounded-md flex flex-col justify-center hover:opacity-70 py-2`}
              aria-disabled={loadingExhibitorAction}
            >
              <p className="text-sm">Accept</p>
            </div>
            <div
              className={`${
                loadingExhibitorAction ? "opacity-80" : ""
              } bg-[#FFEDED] text-[#DC312D] px-8 rounded-md flex flex-col justify-center hover:opacity-70 ml-4 py-2`}
              aria-disabled={loadingExhibitorAction}
              onClick={rejectExhibitor}
            >
              <p className="text-sm">Reject</p>
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
