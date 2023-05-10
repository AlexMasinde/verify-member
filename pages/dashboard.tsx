import ExhibitorsData from "@/components/exhibitorsData";
import ExhibitorContextProvider, {
  useExhibitorContext,
} from "@/contexts/exhibitorContext";

export default function Dashboard() {
  return (
    <ExhibitorContextProvider>
      <ExhibitorsData />
    </ExhibitorContextProvider>
  );
}
