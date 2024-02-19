"use client"

import {Button, Card, CardBody, CardHeader, Divider} from "@nextui-org/react";
import InputBox from "@/app/components/auth/InputBox";
import {IoMdSave} from "react-icons/io";
import React, {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {userState} from "@/store/atoms/user";
import toast, {Toaster} from "react-hot-toast";
import {UpdateUser} from "@/app/actions";
import {userDetailState} from "@/store/selectors/userDetails";
import {isUserLoading} from "@/store/selectors/isUserLoading";
import {MdOutlineCloudUpload} from "react-icons/md";
import {UserUpdateBodySchema} from "../../../../lib/types";
import {RxReset} from "react-icons/rx";

export default function GeneralInformationCard() {

    const userDetails = useRecoilValue(userDetailState);
    const userLoading = useRecoilValue(isUserLoading);

    const [user, setUser] = useRecoilState(userState);
    const [firstname, setFirstname] = useState(user.firstname ?? "");
    const [lastname, setLastName] = useState(user.lastname ?? "");
    const [description, setDescription] = useState(user.description ?? "");
    const [userImage, setUserImage] = useState<File | null>(null);
    const [base64, setBase64] = useState<string | null>(null);

    useEffect(() => {
        if (userImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(userImage);
            fileReader.onload = () => {
                setBase64(fileReader.result as string);
            };
        }
    }, [userImage]);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        setUserImage(e.target.files[0]);
    };

    // On click, clear the input value
    const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.currentTarget.value = "";
    };

    function clearInputs() {
        setFirstname(user.firstname ?? "");
        setLastName(user.lastname ?? "");
        setDescription(user.description ?? "");
    }

    function handleUserUpdate() {
        if (userImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(userImage);
            fileReader.onload = () => {
                setBase64(fileReader.result as string);
            };
        }
        // client side validation
        const newUser = {firstname, lastname, description, base64}
        const result = UserUpdateBodySchema.safeParse(newUser);
        if (!result.success) {
            const allErrors = result.error.issues;
            let errors = "";
            allErrors.map((error) => {
                errors = errors + error.message + "\n";
            })
            toast.error(errors);
            return;
        }
        toast.promise(
            // @ts-ignore
            UpdateUser({
                firstname,
                lastname,
                description,
                profilePicture: base64 ? base64 : user.profilePicture ? user.profilePicture : ""
            }).then(function (result) {
                if (result.updatedUser) {
                    setUser({
                        firstname: result.updatedUser.firstname,
                        lastname: result.updatedUser.lastname,
                        email: result.updatedUser.email,
                        description: result.updatedUser.description,
                        profilePicture: result.updatedUser.profilePictureUrl,
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
            setUserImage(null);
            setBase64(null);
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
            <div className="flex flex-col gap-4 items-center mt-2 mb-4">
                <div className="flex gap-2  items-center">
                    <p>Upload profile picture</p>
                    <Button color="primary" variant={'flat'} className="p-0">
                        <input type={"file"} name={"user_avatar"} id="file-input" className="hidden"
                               onChange={onFileChange}
                               onClick={onClick}/>
                        <label htmlFor="file-input"
                               className="w-full h-full p-2 flex gap-2 items-center cursor-pointer">
                            Select a File
                            <MdOutlineCloudUpload/>
                        </label>
                    </Button>
                </div>
                {base64 && <img src={base64} width={300} height={400} alt="Uploaded Image"/>}
                {userImage ? <p>{userImage.name}</p> : null}
            </div>

            <div className="flex gap-2">
                <Button className="w-full text-md" variant={"solid"} color="primary"
                        startContent={<IoMdSave/>} onClick={() => handleUserUpdate()}>
                    Save</Button>
                <Button className="w-full text-md" variant={"solid"} color="secondary"
                        startContent={<RxReset/>} onClick={clearInputs}>
                    Reset</Button>
            </div>
        </CardBody>
        <Toaster/>
    </Card>
}