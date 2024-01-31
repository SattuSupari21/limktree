import React from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import InputBox from "@/app/components/auth/InputBox";
import Heading from "@/app/components/auth/Heading";
import FormButton from "@/app/components/auth/FormButton";
import BottomWarning from "@/app/components/auth/BottomWarning";

export default function Signup() {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <Card className="p-6">
                <CardHeader className="flex justify-center gap-3">
                    <Heading heading={"Sign Up"} subHeading={"Enter your information to create an account"}/>
                </CardHeader>
                <CardBody>
                    <InputBox label={"First Name"} type={"text"} placeholder={"John"}/>
                    <InputBox label={"Last Name"} type={"text"} placeholder={"Doe"}/>
                    <InputBox label={"Email"} type={"email"} placeholder={"johndoe@example.com"}/>
                    <InputBox label={"Password"} type={"password"} placeholder={"1234567"}/>
                    <FormButton label={"Sign Up"}/>
                </CardBody>
                <CardFooter className='justify-end'>
                    <BottomWarning label={"Already have an account?"} linkLabel={"Log In"} link={"/auth/login"}/>
                </CardFooter>
            </Card>
        </div>
    );
}
