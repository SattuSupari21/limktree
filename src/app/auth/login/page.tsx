"use client"

import React, {useState} from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import InputBox from "@/app/components/auth/InputBox";
import Heading from "@/app/components/auth/Heading";
import FormButton from "@/app/components/auth/FormButton";
import BottomWarning from "@/app/components/auth/BottomWarning";
import {LoginUser} from "@/app/actions";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <Card className="p-6">
                <CardHeader className="flex justify-center gap-3">
                    <Heading heading={"Log In"} subHeading={"Enter your credentials to access your account"}/>
                </CardHeader>
                <CardBody>
                    <InputBox label={"Email"} type={"email"} placeholder={"johndoe@example.com"}
                              onChange={(e) => setEmail(e.target.value)}/>
                    <InputBox label={"Password"} type={"password"} placeholder={"1234567"}
                              onChange={(e) => setPassword(e.target.value)}/>
                    <FormButton label={"Log In"} onClick={() => LoginUser({email, password})}/>
                </CardBody>
                <CardFooter className='justify-end'>
                    <BottomWarning label={"Don't have an account?"} linkLabel={"Sign Up"} link={"/auth/signup"}/>
                </CardFooter>
            </Card>
        </div>
    );
}
