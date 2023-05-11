import ExhibitorsContainer from "@/components/exhibitorsContainer";
import ExhibitorsData from "@/components/exhibitorsData";
import ExhibitorContextProvider, {
  useExhibitorContext,
} from "@/contexts/exhibitorContext";
import Head from "next/head";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>KSSHA Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ExhibitorContextProvider>
        <ExhibitorsContainer />
      </ExhibitorContextProvider>
    </>
  );
}
