import { useExhibitorContext } from "@/contexts/exhibitorContext";

import { Button } from "@chakra-ui/react";
import Image from "next/image";

import logo from "../public/images/uda.png";

import Link from "next/link";

export default function Navigation() {
  const { dispatch, user } = useExhibitorContext();

  function handleLogout() {
    localStorage.clear();
    dispatch({ type: "SET_USER", payload: null });
  }
  return (
    <div className="shadow-md mb-8">
      <div className="flex container mx-auto justify-between items-center py-2">
        <div>
          <Link href="https://uda.ke/">
            <Image src={logo} alt="UDA Logo" width={42} />
          </Link>
        </div>
        {user ? (
          <Button
            backgroundColor="#179847"
            colorScheme="primary"
            variant="solid"
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : null}
      </div>
    </div>
  );
}
