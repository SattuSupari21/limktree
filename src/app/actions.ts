'use server'

import axios from "axios";
import {cookies} from "next/headers";

export async function LoginUser({email, password}: { email: string, password: string }) {
    const res = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
    });
    cookies().set('auth', res.data.token)
}