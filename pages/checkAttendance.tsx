import {
  Input,
  InputLeftAddon,
  InputGroup,
  Container,
  Button,
  Text,
  useMediaQuery,
  Divider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getDataWithRetries, putDataWithRetries } from "@/utils/request";
import logo from "../public/images/uda.png";
import Image from "next/image";
import Link from "next/link";

import { useToast } from "@chakra-ui/react";
import { useExhibitorContext } from "@/contexts/exhibitorContext";

type UserStatusDetails = {
  fullName: string;
  idNumber: string;
  county: string;
  position: string;
};

export default function CheckAttendance() {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [loading, setLoading] = useState(false);
  const [idNumber, setIdNumber] = useState("");
  const [statistics, setStatistics] = useState({
    totalMembers: 0,
    totalCheckins: 0,
  });
  const [userDetails, setUserDetails] = useState<null | UserStatusDetails>(
    null
  );

  const contextData = useExhibitorContext();

  const token = contextData.user?.authToken;

  const [error, setError] = useState("");

  const toast = useToast();

  useEffect(() => {
    async function fetchStats() {
      console.log("Effect ran");
      try {
        if (!token) return;
        const url = "/event/stats";
        const response = await getDataWithRetries(url, token);
        const data = response.data;
        setStatistics({
          totalCheckins: data.totalCheckins,
          totalMembers: data.totalMembers,
        });
      } catch (err) {
        console.log(err);
      }
    }
    fetchStats();
  }, [token]);

  function handleId(event: React.ChangeEvent<HTMLInputElement>) {
    if (error) setError("");
    setIdNumber(event.target.value);
  }

  async function checkStatus() {
    try {
      if (idNumber.trim() === "") {
        setError("Please enter ID number");
        return;
      }
      setError("");
      setLoading(true);
      const url = `/event/get-member?idNumber=${idNumber}`;
      if (!token) {
        toast({
          title: "Error",
          description: "Must be authenticated to fetch user data",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      const response = await getDataWithRetries(url, token);
      const member = response.data;
      setUserDetails({
        fullName: member.fullName,
        idNumber: member.idNumber,
        county: member.county,
        position: member.position,
      });
    } catch (err: any) {
      if (err.code === "ERR_NETWORK") {
        setError("Error checking serial number! Try again later");
        toast({
          title: "Error",
          description: "Error checking serial number! Try again later",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const error =
          err.response?.data?.message ??
          "Error checking serial number! Try again later";
        setError(error);
        toast({
          title: "Error",
          description: error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxW="400px" marginTop={isMobile ? "30px" : "10%"}>
      <Text fontWeight="semibold" marginBottom="10px">
        Total Members: {statistics.totalMembers}
      </Text>
      <Text fontWeight="semibold" marginBottom="10px">
        Total Check-ins: {statistics.totalCheckins}
      </Text>
      <TextContainer>
        <Link href="/">
          <Image src={logo} alt="UDA Logo" width={42} />
        </Link>
        <Text as="b">Check Attendee Status</Text>
      </TextContainer>
      <Divider height="0px" />
      <InputGroup>
        <InputLeftAddon children="ID No" />
        <Input
          isInvalid={error ? true : false}
          value={idNumber}
          onChange={handleId}
          placeholder={error ? error : "29761715"}
          _placeholder={error ? { color: "#E53E3E" } : {}}
        />
      </InputGroup>
      <Button
        isLoading={loading}
        colorScheme="primary"
        variant="solid"
        marginTop="10px"
        width="100%"
        backgroundColor="#179847"
        onClick={checkStatus}
        isDisabled={userDetails ? true : false}
      >
        Check Status
      </Button>
      {userDetails ? (
        <UserDetails
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          setSerialNumber={setIdNumber}
        />
      ) : null}
    </Container>
  );
}

function UserDetails({
  userDetails,
  setUserDetails,
  setSerialNumber,
}: {
  userDetails: UserStatusDetails;
  setUserDetails: (value: UserStatusDetails | null) => void;
  setSerialNumber: (value: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const contextData = useExhibitorContext();

  const token = contextData.user?.authToken;

  const toast = useToast();

  async function checkIn() {
    try {
      setLoading(true);
      if (!token) {
        toast({
          title: "Error",
          description: "Must be authenticated to fetch user data",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      const url = `/event/check-in/${userDetails.idNumber}`;
      const response = await putDataWithRetries(url, token);
      setMessage("User Checked in Successfully");
      console.log(response);
      setLoading(false);
      setMessage("");
      toast({
        title: "Checked In.",
        description: `Successfully checked in ${userDetails.fullName}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setUserDetails(null);
      setSerialNumber("");
    } catch (err: any) {
      console.log(err);
      if (err.code === "ERR_NETWORK") {
        setError("Error checking in! Try again later");
        toast({
          title: "Error.",
          description: "Error checking in! Try again later",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const error =
          err.response?.data?.message ?? "Error checking in! Try again later";
        setError(error);
        toast({
          title: "Error.",
          description: error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-[20px]">
      <TextContainer>
        <Text>
          <strong>Name: </strong>
          {userDetails.fullName}
        </Text>
      </TextContainer>
      <TextContainer>
        <Text>
          <strong>ID Number: </strong>
          {userDetails.idNumber}
        </Text>
      </TextContainer>
      <TextContainer>
        <Text>
          <strong>County: </strong>
          {userDetails.county}
        </Text>
      </TextContainer>
      <TextContainer>
        <Text>
          <strong>Position: </strong>
          {userDetails.position}
        </Text>
      </TextContainer>
      <Button
        isLoading={loading}
        colorScheme="primary"
        variant="solid"
        marginTop="20px"
        width="100%"
        backgroundColor="#179847"
        onClick={checkIn}
        isDisabled={message ? true : false}
      >
        Check In
      </Button>
      {message ? (
        <Container centerContent marginTop="10px">
          <Text color="green" as="b" paddingStart="5px" textAlign="center">
            {message}
          </Text>
        </Container>
      ) : null}
    </div>
  );
}

function TextContainer({ children }: { children: React.ReactNode }) {
  return (
    <Container
      padding="8px"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="8px"
      marginBottom="10px"
      centerContent
      w="100%"
    >
      {children}
    </Container>
  );
}
