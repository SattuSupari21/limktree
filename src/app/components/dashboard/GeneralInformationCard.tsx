import {Button, Card, CardBody, CardHeader, Divider} from "@nextui-org/react";
import InputBox from "@/app/components/auth/InputBox";
import {IoMdSave} from "react-icons/io";
import {AiOutlineDelete} from "react-icons/ai";
import React, {useState} from "react";
import {useRecoilState, useSetRecoilState} from "recoil";
import {userState} from "@/store/atoms/user";
import toast from "react-hot-toast";
import {UpdateUser} from "@/app/actions";

type User = {
    firstname: string,
    lastname: string,
    description?: string
}

export default function GeneralInformationCard() {
    const [user, setUser] = useRecoilState(userState);
    const [firstname, setFirstname] = useState(user.firstname ? user.firstname : "");
    const [lastname, setLastName] = useState(user.lastname ? user.lastname : "");
    const [description, setDescription] = useState(user.description ? user.description : "");

    function clearInputs() {
        setFirstname(user.firstname ? user.firstname : "");
        setLastName(user.lastname ? user.lastname : "");
        setDescription(user.description ? user.description : "");
    }

    function handleUserUpdate() {
        toast.promise(
            // @ts-ignore
            UpdateUser({firstname, lastname, description}).then(function (result) {
                if (result.updatedUser) {
                    setUser({
                        firstname: result.updatedUser.firstname,
                        lastname: result.updatedUser.lastname,
                        email: result.updatedUser.email,
                        description: result.updatedUser.description,
                        isLoading: false
                    })
                }
            }),
            {
                loading: 'Updating user...',
                success: <b>User updated successfully!</b>,
                error: <b>Could not save.</b>,
            }
        ).then(() => {
            return
        });
    }

    return <Card radius={"none"}>
        <CardHeader><p className="text-2xl font-medium">General Information</p></CardHeader>
        <Divider/>
        <CardBody>
            <InputBox label={"First Name"} type={"text"} placeholder={"New First Name"}
                      defaultValue={firstname}
                      onChange={(e) => setFirstname(e.target.value)}/>
            <InputBox label={"Last Name"} type={"text"} placeholder={"New Second Name"} defaultValue={lastname}
                      onChange={(e) => setLastName(e.target.value)}/>
            <InputBox label={"Description"} type={"text"} defaultValue={description}
                      placeholder={"Write something about you here..."}
                      onChange={(e) => setDescription(e.target.value)}/>
            <div className="flex gap-2">
                <Button className="w-full text-md" variant={"flat"} color="secondary"
                        startContent={<IoMdSave/>} onClick={() => handleUserUpdate()}>
                    Save</Button>
                <Button className="w-full text-md" variant={"flat"} color="danger"
                        startContent={<AiOutlineDelete/>} onClick={clearInputs}>
                    Delete</Button>
            </div>
        </CardBody>
    </Card>
}