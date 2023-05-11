import { useExhibitorContext } from "@/contexts/exhibitorContext";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "./button";
import ExhibitorsTable from "./exhibitorsTable";
import ModalComponent from "./modalComponent";

import { api } from "@/api";

import { ExhibitorResponse } from "@/utils/types";
import DashboardTop from "./dashboardTop";
import SearchInput from "./searchInput";

export default function ExhibitorsData() {
  const {
    exhibitors,
    loading,
    error,
    showModal,
    dashError,
    dashSuccess,
    dispatch,
  } = useExhibitorContext();

  const fetchError = !loading && error;
  const noExhibitors = !loading && !error && exhibitors.length === 0;

  const [searchText, setSearchText] = useState("");

  const filteredExhibitors =
    searchText.trim() === ""
      ? exhibitors
      : exhibitors.filter((exhibitor) =>
          exhibitor.name.toLowerCase().includes(searchText.toLowerCase())
        );

  const noExhibitorsInfo = "No exhibitor has made a reservation so far";

  useEffect(() => {
    async function fetchExhibitors() {
      try {
        dispatch({ type: "SET_LOADING", payload: true });

        const accessToken = localStorage.getItem("auth_token");
        const response = await api.get<{ data: ExhibitorResponse[] }>(
          "/exhibitors",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const exhibitorsArray: ExhibitorResponse[] = response.data.data;

        const exhibitorData = exhibitorsArray.map((exhibitorResponse) => {
          return { ...exhibitorResponse.attributes };
        });
        dispatch({ type: "SET_EXHIBITORS", payload: exhibitorData });
      } catch (err: any) {
        if (err.response.status === 403) {
          localStorage.clear();
          dispatch({ type: "SET_USER", payload: null });
        }
        dispatch({
          type: "SET_ERROR",
          payload: "Could not fetch exhibitors! Try again later",
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }
    fetchExhibitors();
  }, []);

  return (
    <div className="pat min-h-[100vh] flex flex-col items-center pb-8">
      <DashboardTop />
      <div className="bg-white w-[95%] mx-4 rounded-lg shadow-lg shadow-[rgba(81, 72, 135, 1)] p-[29px]">
        <div className="flex justify-between mb-[24px]">
          <div>
            <p className="text-md font-bold">Exhibitors</p>
            {!loading && !error ? (
              <p className="text-[#B5B5C3] text-sm mt-[7px]">
                {exhibitors.length} exhibitors have made a reservation
              </p>
            ) : null}
          </div>
          <SearchInput searchText={searchText} setSearchText={setSearchText} />
        </div>
        {dashSuccess ? (
          <div className="w-[fit-content] m-[auto] bg-[#C9F7F5] text-[#1BC5BD] rounded-md px-2 py-2 mb-4">
            <p className="text-sm">{dashSuccess}</p>
          </div>
        ) : null}
        {dashError ? (
          <div className="w-[fit-content] m-[auto] bg-[#FFEDED] text-[#DC312D] rounded-md px-2 py-2 mb-4">
            <p className="text-sm">{dashError}</p>
          </div>
        ) : null}
        {loading ? <ExhibitorsLoader /> : null}
        {fetchError ? <ExhibitorsInfo text={error} /> : null}
        {noExhibitors ? <ExhibitorsInfo text={noExhibitorsInfo} /> : null}
        {exhibitors.length > 0 && !loading ? (
          <ExhibitorsTable exhibitors={filteredExhibitors} />
        ) : null}
      </div>
      {showModal && createPortal(<ModalComponent />, document.body)}
    </div>
  );
}

function ExhibitorsInfo({ text }: { text: string }) {
  return (
    <div className="w-full flex flex-col items-center justify-center h-[300px]">
      <p className="text-[#B5B5C3] text-sm">{text}</p>
    </div>
  );
}

function ExhibitorsLoader() {
  return (
    <div
      role="status"
      className="w-full flex flex-col items-center justify-center h-[300px]"
    >
      <svg
        aria-hidden="true"
        className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-200 fill-[#514887]"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
