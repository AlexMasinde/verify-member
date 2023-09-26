import { ChangeEvent, FormEvent, useState } from "react";

import { loginValidate } from "@/utils/validators";

import Image from "next/image";
import { LoginErrors } from "@/utils/types";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import logo from "../public/images/uda.png";

import { postDataWithRetries } from "@/utils/request";
import { useExhibitorContext } from "@/contexts/exhibitorContext";

export default function Login() {
  const { dispatch } = useExhibitorContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputErrors, setInputErrors] = useState<LoginErrors>({
    email: "",
    password: "",
  });
  function handlePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
    setInputErrors({ ...inputErrors, password: "" });
  }

  function handleEmail(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
    setInputErrors({ ...inputErrors, email: "" });
  }

  async function handleSubmit() {
    const { errors, valid } = loginValidate({ email, password });
    if (!valid) {
      setInputErrors(errors);
      return;
    }
    try {
      setLoading(true);
      const url = "/auth/local";
      const data = {
        identifier: email,
        password: password,
      };
      const response = await postDataWithRetries(data, url);
      const accessToken = response.jwt;
      const userData = {
        email: response.user.email,
        name: response.user.username,
      };
      localStorage.setItem("auth_token", accessToken);
      setEmail("");
      setPassword("");
      dispatch({
        type: "SET_USER",
        payload: { ...userData, authToken: accessToken },
      });
    } catch (err: any) {
      console.log(err);
      if (err.code === "ERR_NETWORK") {
        setError("Error logging in! Try again later");
      } else {
        setError(err.response.data.error.message);
      }
      setTimeout(() => {
        setError("");
      }, 4000);
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
      <div className="md:w-[400px] md:shadow-md rounded-[8px] p-[20px] w-full md:h-fit">
        <div className="flex flex-col items-center">
          <Image
            src={logo}
            width={42}
            alt="KSSHA logo"
            style={{ marginBottom: "10px" }}
          />
          <Text fontSize="md" fontWeight="semibold">
            Login to Access Attendance Dashboard
          </Text>
        </div>
        <form style={{ marginTop: "20px" }}>
          <InputGroup className="mb-4">
            <InputLeftElement pointerEvents="none">
              <EmailIcon color="gray.300" />
            </InputLeftElement>
            <Input
              isInvalid={inputErrors.email ? true : false}
              placeholder={
                inputErrors.email ? inputErrors.email : "example@email.com"
              }
              value={email}
              onChange={handleEmail}
              _placeholder={inputErrors.email ? { color: "#E53E3E" } : {}}
            />
          </InputGroup>
          <InputGroup className="mb-4">
            <InputLeftElement pointerEvents="none">
              <LockIcon color="gray.300" />
            </InputLeftElement>
            <Input
              isInvalid={inputErrors.password ? true : false}
              placeholder={
                inputErrors.password ? inputErrors.password : "*******"
              }
              value={password}
              onChange={handlePassword}
              type="password"
              _placeholder={inputErrors.password ? { color: "#E53E3E" } : {}}
            />
          </InputGroup>
          <div className="flex flex-col items-center mt-[10px]">
            <Button
              isLoading={loading}
              colorScheme="primary"
              variant="solid"
              marginTop="10px"
              width="100%"
              backgroundColor="#179847"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </div>
          {error ? (
            <Text textAlign="center" color="red" marginTop="8px">
              {error}
            </Text>
          ) : null}
        </form>
      </div>
    </div>
  );
}
