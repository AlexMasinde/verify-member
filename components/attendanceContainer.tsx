import { useExhibitorContext } from "@/contexts/exhibitorContext";
import AppLoading from "./appLoading";
import Login from "./login";
import CheckAttendance from "@/pages/checkAttendance";

export default function AttendanceContainer() {
  const { appLoading } = useExhibitorContext();
  return <>{appLoading ? <AppLoading /> : <CheckAuth />}</>;
}

function CheckAuth() {
  const { user } = useExhibitorContext();
  return <>{user ? <CheckAttendance /> : <Login />}</>;
}
