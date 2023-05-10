import { useExhibitorContext } from "@/contexts/exhibitorContext";
import Button from "./button";

export default function ModalComponent() {
  const { dispatch, selectedExhibitor } = useExhibitorContext();
  const { reservationStatus } = selectedExhibitor;

  const statusText =
    reservationStatus === "pending"
      ? "Pending"
      : reservationStatus === "accepted"
      ? "Accepted"
      : "Rejected";

  return (
    <div
      onClick={() => dispatch({ type: "SHOW_MODAL", payload: false })}
      className="fixed flex-col inset-0 flex items-center justify-center bg-[#514887] bg-opacity-40"
    >
      <div className="bg-white shadow-lg rounded-lg p-[24px] w-[500px]">
        <TextItem title="Name" text={selectedExhibitor.name} />
        <TextItem title="Email" text={selectedExhibitor.email} />
        <TextItem title="Phone" text={selectedExhibitor.phoneNumber} />
        <TextItem title="Status" text={statusText} />
        <TextItem title="Description" text={selectedExhibitor.description} />
        <div className="mt-4 flex justify-end">
          <div onClick={() => dispatch({ type: "SHOW_MODAL", payload: false })}>
            <Button text="Close" disabled={false} backgroundColor="#DC312D" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TextItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="p-2 border-b">
      <p className="text-sm font-bold uppercase py-1">{title}</p>
      <p className="text-md text-[#B5B5C3]">{text}</p>
    </div>
  );
}
