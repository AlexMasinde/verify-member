import { useExhibitorContext } from "@/contexts/exhibitorContext";
import AppLoading from "./appLoading";
import ExhibitorsData from "./exhibitorsData";
import Login from "./login";

export default function ExhibitorsContainer() {
  const { appLoading } = useExhibitorContext();
  return <>{appLoading ? <AppLoading /> : <CheckAuth />}</>;
}

function CheckAuth() {
  const { user } = useExhibitorContext();
  return <>{user ? <ExhibitorsData /> : <Login />}</>;
}
