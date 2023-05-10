import { ExhibitorResponse } from "@/utils/types";
import Button from "./button";
import Exhibitor from "./exhibitor";

export default function ExhibitorsTable({
  loadingLogout,
  exhibitors,
}: {
  loadingLogout: boolean;
  exhibitors: ExhibitorResponse[];
}) {
  return (
    <table className="min-w-full border-collapse  mr-[auto] ml-[auto] ">
      <thead className="">
        <tr className="">
          <th className="py-2 text-left rounded-tl-md rounded-bl-md bg-[#514887] bg-opacity-40 text-[#514887] font-medium text-sm uppercase px-4">
            Institution
          </th>
          <th className="py-2 text-left bg-[#514887] bg-opacity-40 text-[#514887] font-medium text-sm uppercase">
            Email
          </th>
          <th className="py-2 text-left bg-[#514887] bg-opacity-40 text-[#514887] font-medium text-sm uppercase">
            Reserved
          </th>
          <th className="py-2 text-left bg-[#514887] bg-opacity-40 text-[#514887] font-medium text-sm uppercase">
            phone
          </th>
          <th className="py-2 text-left rounded-tr-md rounded-br-md bg-[#514887] bg-opacity-40 text-[#514887] font-medium text-sm uppercase"></th>
        </tr>
      </thead>
      <tbody>
        {exhibitors.map((exhibitor: ExhibitorResponse) => {
          const exhibitorData = exhibitor.attributes;
          return (
            <Exhibitor
              key={exhibitorData.identifier}
              loadingLogout={loadingLogout}
              exhibitor={exhibitorData}
            />
          );
        })}
      </tbody>
    </table>
  );
}
