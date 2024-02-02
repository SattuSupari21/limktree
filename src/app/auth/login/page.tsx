"use client"

import React, {useState} from "react";
import {Card, CardHeader, CardBody, CardFooter, Button} from "@nextui-org/react";
import InputBox from "@/app/components/auth/InputBox";
import Heading from "@/app/components/auth/Heading";
import FormButton from "@/app/components/auth/FormButton";
import BottomWarning from "@/app/components/auth/BottomWarning";
import {LoginUser} from "@/app/actions";
import {useRouter} from "next/navigation";
import {IoMdArrowBack} from "react-icons/io";
import {useSetRecoilState} from "recoil";
import {userState} from "@/store/atoms/user";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const setUser = useSetRecoilState(userState);

    function handleUserLogin() {
        LoginUser({email, password}).then(function (result) {
            setUser({isLoading: false, firstname: result.firstname, lastname: result.lastname, email: result.email})
            router.push('/')
        })
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <Card className="p-6 sm:w-screen sm:h-screen lg:w-auto lg:h-auto md:w-auto md:h-auto">
                <Button isIconOnly color="default" size={'sm'} aria-label="go back" onClick={router.back}>
                    <IoMdArrowBack/>
                </Button>
                <CardHeader className="flex justify-center gap-3">
                    <Heading heading={"Log In"} subHeading={"Enter your credentials to access your account"}/>
                </CardHeader>
                <CardBody>
                    <InputBox label={"Email"} type={"email"} placeholder={"johndoe@example.com"}
                              onChange={(e) => setEmail(e.target.value)}/>
                    <InputBox label={"Password"} type={"password"} placeholder={"1234567"}
                              onChange={(e) => setPassword(e.target.value)}/>
                    <FormButton label={"Log In"} onClick={handleUserLogin}/>
                </CardBody>
                <CardFooter className='justify-end'>
                    <BottomWarning label={"Don't have an account?"} linkLabel={"Sign Up"} link={"/auth/signup"}/>
                </CardFooter>
            </Card>
        </div>
    );
}
