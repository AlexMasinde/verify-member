import Button from "@/components/button";
import Input from "@/components/input";
import { LoginErrors } from "@/utils/types";
import { loginValidate } from "@/utils/validators";
import { ChangeEvent, FormEvent, useState } from "react";

import Login from "@/components/login";

export default function Dashboard() {
  return (
    <div>
      <Login />
    </div>
  );
}
