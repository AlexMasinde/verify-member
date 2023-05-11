import ExhibitorsContainer from "@/components/exhibitorsContainer";
import ExhibitorsData from "@/components/exhibitorsData";
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
