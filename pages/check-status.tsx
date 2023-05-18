import {
  Input,
  InputLeftAddon,
  InputGroup,
  Container,
  Button,
  Text,
  useMediaQuery,
  Divider,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { getDataWithRetries, postDataWithRetries } from "@/utils/request";
import logo from "../public/images/kssha_logo.png";
import { useRouter } from "next/router";
import delay from "@/utils/delay";
import Image from "next/image";

type UserStatusDetails = {
  name: string;
  tscNumber: string;
  school: string;
  county: string;
  serialNumber: string;
};

export default function CheckStatus() {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const [loading, setLoading] = useState(false);
  const [serialNumber, setSerialNUmber] = useState("");
  const [userDetails, setUserDetails] = useState<null | UserStatusDetails>(
    null
  );

  const [error, setError] = useState("");

  function handleSerial(event: React.ChangeEvent<HTMLInputElement>) {
    if (error) setError("");
    setSerialNUmber(event.target.value);
  }

  async function checkStatus() {
    try {
      if (serialNumber.trim() === "") {
        setError("Please enter a serial number");
        return;
      }
      setError("");
      setLoading(true);
      const updatedSerialNumber = serialNumber.replace(/^KSSHA-/, "");
      const fullSerialNumber = `KSSHA-${updatedSerialNumber.toUpperCase()}`;
      const url = `/registered-member/status/${fullSerialNumber}`;
      const response = await getDataWithRetries(url);
      const registeredMember = response.data;
      setUserDetails({
        name: registeredMember.name,
        tscNumber: registeredMember.tscNumber,
        school: registeredMember.school,
        county: registeredMember.county,
        serialNumber: registeredMember.serialNumber,
      });
    } catch (err: any) {
      console.log(err);
      if (err.code === "ERR_NETWORK") {
        setError("Error checking serial number! Try again later");
      } else {
        const error =
          err.response?.data.error.message ??
          "Error checking serial number! Try again later";
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxW="400px" marginTop={isMobile ? "30px" : "10%"}>
      <TextContainer>
        <Image src={logo} alt="KSSHA logo" />
        <Text as="b">Check Registration Status</Text>
      </TextContainer>
      <Divider height="0px" />
      <InputGroup>
        <InputLeftAddon children="KSSHA-" />
        <Input placeholder="BBGWEH802" onChange={handleSerial} />
      </InputGroup>
      {error ? (
        <Text color="red" paddingStart="5px" marginTop="10px">
          {error}
        </Text>
      ) : null}
      <Button
        isLoading={loading}
        colorScheme="primary"
        variant="solid"
        marginTop="10px"
        width="100%"
        backgroundColor="#514887"
        onClick={checkStatus}
        isDisabled={userDetails ? true : false}
      >
        Check Status
      </Button>
      {userDetails ? <UserDetails userDetails={userDetails} /> : null}
    </Container>
  );
}

function UserDetails({ userDetails }: { userDetails: UserStatusDetails }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("User Checked in Successfully");

  const router = useRouter();

  async function checkIn() {
    try {
      setLoading(true);
      const payload = {
        serialNumber: userDetails.serialNumber,
      };
      const url = "/registered-member/check-in";

      await postDataWithRetries(payload, url);
      setMessage("User Checked in Successfully");
      await delay(4000);
      setMessage("");
    } catch (err: any) {
      console.log(err);
      if (err.code === "ERR_NETWORK") {
        setError("Error checking in! Try again later");
      } else {
        const error =
          err.response?.data.error.message ??
          "Error checking in! Try again later";
        setError(error);
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
          {userDetails.name}
        </Text>
      </TextContainer>
      <TextContainer>
        <Text>
          <strong>TSC Number: </strong>
          {userDetails.tscNumber}
        </Text>
      </TextContainer>
      <TextContainer>
        <Text>
          <strong>School: </strong>
          {userDetails.school}
        </Text>
      </TextContainer>
      <TextContainer>
        <Text>
          <strong>County: </strong>
          {userDetails.county}
        </Text>
      </TextContainer>
      <Button
        isLoading={loading}
        colorScheme="primary"
        variant="solid"
        marginTop="20px"
        width="100%"
        backgroundColor="#514887"
        onClick={checkIn}
      >
        Check In
      </Button>
      {error ? (
        <Text color="red" paddingStart="5px" marginTop="10px">
          {error}
        </Text>
      ) : null}
      {message ? (
        <Text
          color="green"
          as="b"
          paddingStart="5px"
          marginTop="10px"
          textAlign="center"
        >
          {message}
        </Text>
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
