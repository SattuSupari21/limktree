import {Card, CardBody, CardHeader, Divider} from "@nextui-org/react";
import LinkComponent from "@/app/components/LinkComponent";
import React from "react";

export default function UserLinksCard() {
    return <Card radius={"none"}>
        <CardHeader><p className="text-2xl font-medium">Your Links</p></CardHeader>
        <Divider/>
        <CardBody>
            <LinkComponent/>
        </CardBody>
    </Card>


}