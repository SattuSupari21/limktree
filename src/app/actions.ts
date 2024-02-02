"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function LoginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await axios.post("http://localhost:3000/api/auth/login", {
    email,
    password,
  });
  if (res.status === 200) {
    cookies().set("auth", res.data.token);
    return res.data;
  }
}

export async function GetUser() {
  const res = await axios.get("http://localhost:3000/api/user/getUser", {
    withCredentials: true,
    headers: {
      Cookie: cookies().toString(),
    },
  });

  return res.data;
}

