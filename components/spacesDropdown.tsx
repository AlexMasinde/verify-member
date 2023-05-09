import { ExhibitorData, ExhibitorErrors, SpaceData } from "@/utils/types";

export default function SpacesDropdown({
  selectedSpace,
  setSelectedSpace,
  setShowSpacesDropdown,
  setExhibitorData,
  exhibitorData,
  inputErrors,
  setInputErrors,
  listOfSpaces,
}: {
  selectedSpace: SpaceData | null;
  setSelectedSpace: (value: SpaceData) => void;
  setShowSpacesDropdown: (value: boolean) => void;
  setExhibitorData: (value: ExhibitorData) => void;
  exhibitorData: ExhibitorData;
  inputErrors: ExhibitorErrors;
  setInputErrors: (value: ExhibitorErrors) => void;
  listOfSpaces: any;
}) {
  function handleClick(spaceData: SpaceData, availableSpaces: any) {
    if (availableSpaces === 0) return;
    setSelectedSpace(spaceData);
    setExhibitorData({ ...exhibitorData, spaceReserved: spaceData.id });
    setInputErrors({ ...inputErrors, spaceReserved: "" });
    setShowSpacesDropdown(false);
  }

  const spaces: SpaceData[] = [
    {
      price: "150,000",
      tables: "3",
      chairs: "6",
      tags: "6",
      availableSpaces: "30",
      tent: "14' X 20'",
      id: "A",
    },
    {
      price: "100,000",
      tables: "2",
      chairs: "4",
      tags: "4",
      availableSpaces: "70",
      tent: "11' X 11'",
      id: "B",
    },
    {
      price: "50,000",
      tables: "1",
      chairs: "2",
      tags: "2",
      availableSpaces: "100",
      tent: "8' X 8'",
      id: "C",
    },
  ];

  return (
    <div>
      {spaces.map((space) => {
        const similarSpaces = listOfSpaces.filter(
          (fetchedSpace: any) => fetchedSpace.space === space.id
        );

        const availableSpaces =
          similarSpaces.length > 0 ? similarSpaces[0].slotsAvailable : "";

        return (
          <div
            className="mt-[10px] hover:opacity-50 hover:cursor-pointer pb-4"
            key={space.id}
            onClick={() => handleClick(space, availableSpaces)}
          >
            <DropDownItem spaceData={space} availableSpaces={availableSpaces} />
          </div>
        );
      })}
    </div>
  );
}

function DropDownItem({
  spaceData,
  availableSpaces,
}: {
  spaceData: SpaceData;
  availableSpaces: any;
}) {
  const noSpaces = availableSpaces === 0;

  return (
    <div className={`${noSpaces ? "opacity-50" : ""}`}>
      <p className="font-bold text-sm">
        TENTS ({spaceData.tent}) {spaceData.price}/-
      </p>
      <p className="text-sm pt-[4px]">
        i) Tables ................... {spaceData.tables}
      </p>
      <p className="text-sm pt-[4px]">
        ii) Chairs................... {spaceData.chairs}
      </p>
      <p className="text-sm pt-[4px]">
        iii) Tags...................... {spaceData.tags}
      </p>
      {availableSpaces ? (
        <p className="font-bold text-sm pt-[4px]">
          SPACES AVAILABLE - {availableSpaces}
        </p>
      ) : null}
    </div>
  );
}
