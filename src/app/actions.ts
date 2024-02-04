"use server";

import axios from "axios";
import {cookies} from "next/headers";

export async function LoginUser({email, password}: {
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

export async function SignupUser({firstname, lastname, email, password, customUrl}: {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    customUrl: string
}) {
    const res = await axios.post("http://localhost:3000/api/auth/signup", {
        firstname,
        lastname,
        email,
        password,
        customUrl
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

export async function GetUserLinks() {
    const res = await axios.get("http://localhost:3000/api/user/getLinks", {
        withCredentials: true,
        headers: {
            Cookie: cookies().toString(),
        },
    })

    return res.data;
}

export async function CreateNewLink({title, url, position}: { title: string, url: string, position: number }) {
    const res = await axios.post("http://localhost:3000/api/user/createLink", {
        title,
        url,
        position
    }, {
        withCredentials: true,
        headers: {
            Cookie: cookies().toString(),
        }
    });

    return res.data;
}