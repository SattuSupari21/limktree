"use server";

import axios from "axios";
import {cookies} from "next/headers";
import {prisma} from "../../lib/db";
import {revalidatePath} from "next/cache";

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

export async function UpdateUser({firstname, lastname, description}: {
    firstname: string,
    lastname: string,
    description?: string
}) {
    const res = await axios.post("http://localhost:3000/api/user/updateUser", {
        firstname,
        lastname,
        description
    }, {
        withCredentials: true,
        headers: {Cookie: cookies().toString()},
    });
    if (res.status === 200) {
        return res.data;
    }
}

export async function GetUser() {
    try {
        const res = await axios.get("http://localhost:3000/api/user/getUser", {
            withCredentials: true,
            headers: {
                Cookie: cookies().toString(),
            },
        });
        return res.data;
    } catch (e) {
        return {error: 'error logging in'}
    }
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
    const res = await axios.post("http://localhost:3000/api/link/createLink", {
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

export async function DeleteLink(linkId: number) {
    const res = await axios.delete("http://localhost:3000/api/link/deleteLink", {
        headers: {Cookie: cookies().toString()},
        withCredentials: true,
        data: {linkId},
    });

    return res.data;
}

export async function GetLinks(customUrl: string) {
    const userId = await prisma.userSettings.findUnique({
        where: {
            customUrl
        },
        select: {
            userId: true
        }
    }).then(response => response?.userId)

    if (!userId) return {error: "Invalid customUrls"}

    const links = await prisma.link.findMany({
        where: {
            userId
        }
    })

    const userDetails = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            firstname: true,
            lastname: true,
            description: true
        }
    })

    return {links, userDetails};

}