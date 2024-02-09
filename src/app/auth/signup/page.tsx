"use client"

import React, {useState} from "react";
import {Card, CardHeader, CardBody, CardFooter, Button} from "@nextui-org/react";
import InputBox from "@/app/components/auth/InputBox";
import Heading from "@/app/components/auth/Heading";
import FormButton from "@/app/components/auth/FormButton";
import BottomWarning from "@/app/components/auth/BottomWarning";
import {IoMdArrowBack} from "react-icons/io";
import {useRouter} from "next/navigation";
import {LoginUser, SignupUser} from "@/app/actions";
import {useSetRecoilState} from "recoil";
import {userState} from "@/store/atoms/user";

export default function Signup() {
    const router = useRouter();
    const setUser = useSetRecoilState(userState);
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [customUrl, setCustomUrl] = useState("")

    function handleUserSignup() {
        SignupUser({firstname, lastname, email, password, customUrl}).then(function (result) {
            setUser({
                isLoading: false,
                firstname: result.firstname,
                lastname: result.lastname,
                email: result.email,
                description: result.description,
                profilePicture: null,
            })
            router.push('/')
        })
    }

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
                              onChange={(e) => setPassword(e.target.value)}/>
                    <InputBox label={"Custom URL"} type={"text"} placeholder={"Username"}
                              onChange={(e) => setCustomUrl(e.target.value)}/>
                    <FormButton label={"Sign Up"} onClick={handleUserSignup}/>
                </CardBody>
                <CardFooter className='justify-end'>
                    <BottomWarning label={"Already have an account?"} linkLabel={"Log In"} link={"/auth/login"}/>
                </CardFooter>
            </Card>
        </div>
    );
}
