import { useExhibitorContext } from "@/contexts/exhibitorContext";
import { useRouter } from "next/router";
import Button from "./button";

export default function DashboardTop({ onOpen }: { onOpen: () => void }) {
  const { dispatch, user } = useExhibitorContext();
  const router = useRouter();

  function logout() {
    localStorage.clear();
    dispatch({ type: "SET_USER", payload: null });
  }

  function registration() {
    router.back();
  }
  return (
    <div className="bg-white w-[95%] mx-4 rounded-lg shadow-lg shadow-[rgba(81, 72, 135, 1)] p-[29px] flex justify-between  items-center my-4">
      <div>
        <p className="text-md font-bold">Welcome back!</p>
        <p className="text-[#B5B5C3] text-sm mt-[7px]">{user?.name}</p>
      </div>
      <div className="flex">
        <div className="mr-[10px]" onClick={onOpen}>
          <Button
            text="Resend Email"
            disabled={false}
            backgroundColor="green"
          />
        </div>
        <div onClick={registration}>
          <Button text="Registration" disabled={false} />
        </div>
        <div className="ml-[10px]" onClick={logout}>
          <Button text="Logout" disabled={false} backgroundColor="#F64E60" />
        </div>
      </div>
    </div>
  );
}
