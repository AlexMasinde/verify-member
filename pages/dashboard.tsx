import ExhibitorsData from "@/components/exhibitorsData";
import ExhibitorsContainer from "@/components/exhibitorsContainer";
import ExhibitorContextProvider, {
  useExhibitorContext,
} from "@/contexts/exhibitorContext";

export default function Dashboard() {
  return (
    <ExhibitorContextProvider>
      <ExhibitorsContainer />
    </ExhibitorContextProvider>
  );
}
