import { useExhibitorContext } from "@/contexts/exhibitorContext";
import AppLoading from "./appLoading";
import Login from "./login";
import CheckAttendance from "@/pages/checkAttendance";
import Navigation from "./navigation";

export default function AttendanceContainer() {
  const { appLoading } = useExhibitorContext();
  return (
    <>
      {appLoading ? (
        <AppLoading />
      ) : (
        <div>
          <Navigation />
          <CheckAuth />
        </div>
      )}
    </>
  );
}

function CheckAuth() {
  const { user } = useExhibitorContext();
  return <>{user ? <CheckAttendance /> : <Login />}</>;
}
