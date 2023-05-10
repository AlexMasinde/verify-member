import { useExhibitorContext } from "@/contexts/exhibitorContext";
import { Exhibitor } from "@/utils/types";
import Button from "./button";

export default function Exhibitor({
  exhibitor,
  loadingLogout,
}: {
  exhibitor: Exhibitor;
  loadingLogout: boolean;
}) {
  const spaceReserved =
    exhibitor.spaceReserved === "A"
      ? "14' X 20'"
      : exhibitor.spaceReserved === "B"
      ? "11' X 11'"
      : "8' X 8'";

  const status = exhibitor.reservationStatus;

  const { dispatch } = useExhibitorContext();

  return (
    <tr
      key={exhibitor.identifier}
      className="hover:cursor-pointer hover:bg-purple-50"
      onClick={() =>
        dispatch({ type: "SET_SELECTED_EXHIBITOR", payload: exhibitor })
      }
    >
      <td className="border-b py-4 px-4">{exhibitor.name}</td>
      <td className="border-b py-4">{exhibitor.email}</td>
      <td className="border-b py-4">{spaceReserved}</td>
      <td className="border-b py-4">{exhibitor.phoneNumber}</td>
      <td className="border-b py-4">
        {status === "pending" ? (
          <div className="flex justify-end ">
            <div>
              <Button
                text="Accept"
                disabled={loadingLogout}
                textColor="#1BC5BD"
                backgroundColor="#C9F7F5"
              />
            </div>
            <div className="ml-[24px] flex flex-col items-stretch">
              <Button
                text="Reject"
                disabled={loadingLogout}
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
  const backgroundColor = status === "accepted" ? "#C9F7F5" : "#FFEDED";
  const textColor = status === "accepted" ? "#1BC5BD" : "#DC312D";
  const text = status === "accepted" ? "Accepted" : "Rejected";

  return (
    <div
      //   style={{ backgroundColor: backgroundColor }}
      className="px-4 py-[0px] rounded-lg text-right"
    >
      <p style={{ color: textColor }}>{text}</p>
    </div>
  );
}
