import { ChangeEvent, FormEvent, useState } from "react";

import { loginValidate } from "@/utils/validators";

import Image from "next/image";
import { LoginErrors } from "@/utils/types";
import Button from "./button";
import Input from "./input";
import logo from "../public/images/kssha_logo.png";

import { postDataWithRetries } from "@/utils/request";
import { useExhibitorContext } from "@/contexts/exhibitorContext";

import TextContainer from "./textContainer";
import { Text } from "@chakra-ui/react";
import Link from "next/link";

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { errors, valid } = loginValidate({ email, password });

    if (!valid) {
      setInputErrors(errors);
      console.log(errors);
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
      console.log(response);
      const accessToken = response.jwt;
      const userData = {
        email: response.user.email,
        name: response.user.username,
      };
      localStorage.setItem("auth_token", accessToken);
      setEmail("");
      setPassword("");
      dispatch({ type: "SET_USER", payload: userData });
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
    <div className="w-full h-[100vh] flex flex-col items-center justify-center pat">
      <div className="md:w-[400px] shadow-lg md:shadow-[rgba(81, 72, 135, 1)] bg-white rounded-[8px] p-[20px] w-full xs:h-full md:h-fit">
        <TextContainer>
          <Link href="/">
            <Image
              src={logo}
              alt="KSSHA logo"
              style={{ marginBottom: "10px" }}
            />
          </Link>
          <Text as="b">Login</Text>
        </TextContainer>
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <Input
            inputLabel="Email"
            onChange={handleEmail}
            error={inputErrors?.email ? inputErrors?.email : ""}
            value={email}
          />
          <Input
            inputLabel="Password"
            onChange={handlePassword}
            error={inputErrors?.password ? inputErrors?.password : ""}
            value={password}
            type="password"
          />
          <div className="flex flex-col items-center mt-[10px]">
            <Button text="Login" disabled={loading} />
          </div>
          <div>
            {error ? (
              <p className="text-center text-red-500 text-sm mt-3">{error}</p>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
