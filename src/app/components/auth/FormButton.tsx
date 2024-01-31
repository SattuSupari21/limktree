import React from "react";
import {Button} from "@nextui-org/react";

export default function FormButton({label}: { label: string }) {
    return <Button variant={'solid'} color={'primary'}>{label}</Button>
}