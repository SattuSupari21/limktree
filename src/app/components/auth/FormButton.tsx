import React from "react";
import {Button} from "@nextui-org/react";

export default function FormButton({label, onClick}: {
    label: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}) {
    return <Button variant={'solid'} color={'primary'} onClick={onClick}>{label}</Button>
}