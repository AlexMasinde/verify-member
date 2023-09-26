import AttendanceContainer from "@/components/attendanceContainer";
import ExhibitorContextProvider from "@/contexts/exhibitorContext";
import Head from "next/head";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>UDA - Attendance</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ExhibitorContextProvider>
        <AttendanceContainer />
      </ExhibitorContextProvider>
    </>
  );
}
