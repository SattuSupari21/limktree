import {Card, CardBody, CardHeader, Divider} from "@nextui-org/react";
import LinkButtonComponent from "@/app/components/LinkButtonComponent";
import React from "react";

export default function LinkButtonsCard() {
    return <Card radius={"none"}>
        <CardHeader><p className="text-2xl font-medium">Buttons</p></CardHeader>
        <Divider/>
        <CardBody>
            <LinkButtonComponent/>
        </CardBody>
    </Card>


}