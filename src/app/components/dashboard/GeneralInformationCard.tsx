import {Button, Card, CardBody, CardHeader, Divider} from "@nextui-org/react";
import InputBox from "@/app/components/auth/InputBox";
import {IoMdSave} from "react-icons/io";
import {AiOutlineDelete} from "react-icons/ai";
import React from "react";

export default function GeneralInformationCard() {
    return <Card radius={"none"}><CardHeader><p className="text-2xl font-medium">General
        Information</p>
    </CardHeader>
        <Divider/>
        <CardBody>

            <InputBox label={"First Name"} type={"text"} placeholder={"Samtu"}
                      onChange={() => console.log('firstname')}/>
            <InputBox label={"Last Name"} type={"text"} placeholder={"Sumpari"}
                      onChange={() => console.log('lastname')}/>
            <InputBox label={"Description"} type={"text"}
                      placeholder={"Write something about you here..."}
                      onChange={() => console.log('description')}/>
            <div className="flex gap-2">
                <Button className="w-full text-md" variant={"flat"} color="secondary"
                        startContent={<IoMdSave/>}>
                    Save</Button>
                <Button className="w-full text-md" variant={"flat"} color="danger"
                        startContent={<AiOutlineDelete/>}>
                    Delete</Button>
            </div>

        </CardBody>
    </Card>
}