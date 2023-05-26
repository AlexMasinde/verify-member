import {
  Container,
  Input,
  Text,
  Button,
  useMediaQuery,
  Box,
} from "@chakra-ui/react";

import { useState } from "react";
import { useExhibitorContext } from "@/contexts/exhibitorContext";

import { postDataWithRetries } from "@/utils/request";

interface ErrorObject {
  tscNumber?: string;
  email?: string;
  fetchError?: string;
}

export default function ResendEmail() {
  const { dispatch } = useExhibitorContext();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [loading, setLoading] = useState(false);
  const [tscNumber, setTscNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<null | ErrorObject>(null);
  const [message, setMessage] = useState("");

  function handleTscNumber(event: React.ChangeEvent<HTMLInputElement>) {
    if (errors?.tscNumber) setErrors({ ...errors, tscNumber: "" });
    setTscNumber(event.target.value);
  }

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    if (errors?.email) setErrors({ ...errors, email: "" });
    setEmail(event.target.value);
  }

  async function resendEmail() {
    const { valid, errors } = validator(email, tscNumber);

    if (!valid) {
      setErrors(errors);
      return;
    }

    try {
      setLoading(true);
      const accessToken = localStorage.getItem("auth_token");
      if (!accessToken) return;

      const URL = "/registered-member/resend-email";
      const payload = { email: email, tscNumber: tscNumber };
      const response = await postDataWithRetries(payload, URL, accessToken);
      setMessage(response.message);
      setLoading(false);
      setEmail("");
      setTscNumber("");
      setTimeout(() => {
        setMessage("");
      }, 4000);
    } catch (err: any) {
      console.log(err);
      if (err.code === "ERR_NETWORK") {
        setErrors({
          ...errors,
          fetchError: "Could not resend invitation! Try again later",
        });
      } else if (err.response?.status === 403) {
        localStorage.clear();
        dispatch({ type: "SET_USER", payload: null });
      } else {
        setErrors({
          ...errors,
          fetchError:
            err.response?.data.error.message ??
            "Could not resend invitation! Try again later",
        });
      }
      setTimeout(() => {
        setErrors({
          ...errors,
          fetchError: "",
        });
      }, 4000);
      setLoading(false);
    }
  }

  return (
    <div>
      <Container maxW={isMobile ? "100%" : "400px"}>
        <Box marginBottom="6px" marginTop="20px">
          <Text as="b" marginTop="10px">
            TSC Number
          </Text>
        </Box>
        <Input value={tscNumber} onChange={handleTscNumber} />

        {errors?.tscNumber ? (
          <Text color="red" paddingStart="5px" marginTop="10px">
            {errors.tscNumber}
          </Text>
        ) : null}

        <Box marginBottom="6px" marginTop="20px">
          <Text as="b" marginTop="10px">
            Email
          </Text>
        </Box>
        <Input value={email} onChange={handleEmail} />

        {errors?.email ? (
          <Text color="red" paddingStart="5px" marginTop="10px">
            {errors.email}
          </Text>
        ) : null}

        <Button
          isLoading={loading}
          colorScheme="primary"
          variant="solid"
          marginTop="20px"
          width="100%"
          backgroundColor="#514887"
          onClick={resendEmail}
        >
          Resend Email
        </Button>
        {errors?.fetchError ? (
          <Text color="red" paddingStart="5px" marginTop="10px">
            {errors.fetchError}
          </Text>
        ) : null}
        {message ? (
          <Text color="green" paddingStart="5px" marginTop="10px">
            {message}
          </Text>
        ) : null}
      </Container>
    </div>
  );
}

function validator(email: string, tscNumber: string) {
  const errors: ErrorObject = {};

  if (tscNumber.trim() === "") {
    errors.tscNumber = "Please enter the principal's TSC number";
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (email.trim() === "") {
    errors.email = "Please enter email address";
  } else if (!emailRegex.test(email)) {
    errors.email = "Please provide a valid email address";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}
