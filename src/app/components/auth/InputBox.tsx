import {Input} from "@nextui-org/input";
import React from "react";
import {MdOutlineEmail} from "react-icons/md";
import {LuTextCursorInput} from "react-icons/lu";
import {RiLockPasswordLine} from "react-icons/ri";
import {ValueBase} from "@react-types/shared";

export default function InputBox({label, type, placeholder, onChange, defaultValue}: {
    label: string,
    type: string,
    placeholder: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    defaultValue?: string,
}) {

    let icon;
    if (type === "email") {
        icon = <MdOutlineEmail/>
    } else if (type === "text") {
        icon = <LuTextCursorInput/>;
    } else if (type === "password") {
        icon = <RiLockPasswordLine/>
    }

    return (
        <div className="flex flex-col gap-1 mb-3">
            <p>{label}</p>
            <Input startContent={icon} variant='bordered' type={type} placeholder={placeholder} size={'sm'}
                   onChange={onChange} value={defaultValue}/>

        </div>
    )
}