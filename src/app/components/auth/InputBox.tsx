import {Input} from "@nextui-org/input";
import React from "react";

export default function InputBox({label, type, placeholder, onChange}: {
    label: string,
    type: string,
    placeholder: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>
}) {
    return (
        <div className="flex flex-col gap-1 mb-3">
            <p>{label}</p>
            <Input variant='bordered' type={type} placeholder={placeholder} size={'sm'} onChange={onChange}/>
        </div>
    )
}