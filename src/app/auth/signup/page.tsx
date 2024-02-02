"use client"

import React, {useState} from "react";
import {Card, CardHeader, CardBody, CardFooter, Button} from "@nextui-org/react";
import InputBox from "@/app/components/auth/InputBox";
import Heading from "@/app/components/auth/Heading";
import FormButton from "@/app/components/auth/FormButton";
import BottomWarning from "@/app/components/auth/BottomWarning";
import {IoMdArrowBack} from "react-icons/io";
import {useRouter} from "next/navigation";

export default function Signup() {
    const router = useRouter();
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <Card className="p-6">
                <Button isIconOnly color="default" size={'sm'} aria-label="go back" onClick={router.back}>
                    <IoMdArrowBack/>
                </Button>
                <CardHeader className="flex justify-center gap-3">
                    <Heading heading={"Sign Up"} subHeading={"Enter your information to create an account"}/>
                </CardHeader>
                <CardBody>
                    <InputBox label={"First Name"} type={"text"} placeholder={"John"}
                              onChange={(e) => setFirstname(e.target.value)}/>
                    <InputBox label={"Last Name"} type={"text"} placeholder={"Doe"}
                              onChange={(e) => setLastname(e.target.value)}/>
                    <InputBox label={"Email"} type={"email"} placeholder={"johndoe@example.com"}
                              onChange={(e) => setEmail(e.target.value)}/>
                    <InputBox label={"Password"} type={"password"} placeholder={"1234567"}
                              onChange={(e) => setEmail(e.target.value)}/>
                    <FormButton label={"Sign Up"} onClick={() => console.log('click')}/>
                </CardBody>
                <CardFooter className='justify-end'>
                    <BottomWarning label={"Already have an account?"} linkLabel={"Log In"} link={"/auth/login"}/>
                </CardFooter>
            </Card>
        </div>
    );
}
