import {Button, Card, CardHeader, Image} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {GetUserLinks} from "@/app/actions";
import {FaPlus} from "react-icons/fa6";
import {Input} from "@nextui-org/input";

import {buttons} from "@/app/constants";
import {IconType} from "react-icons";

function LinkButtonComponent({label, icon: Icon}: { label: string, icon: IconType }) {
    return (
        <div>
            <Button className="text-sm" variant={"bordered"} color="default" startContent={<Icon/>}>{label}</Button>
        </div>
    )
}

export default function LinkComponent() {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        GetUserLinks().then(function (result) {
            setLinks(result.links);
        })
    }, []);

    return (
        <div className="w-full h-full flex flex-col gap-4">
            {
                links.length === 0 &&
                <p className="text-3xl font-semibold text-center p-2">You have no links</p>
            }

            {/*<Card>*/}
            {/*    <CardHeader className="flex gap-3 p-4">*/}
            {/*        <Image*/}
            {/*            alt="nextui logo"*/}
            {/*            height={96}*/}
            {/*            radius="full"*/}
            {/*            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"*/}
            {/*            width={96}*/}
            {/*        />*/}
            {/*        <div className="w-full flex flex-col gap-2">*/}
            {/*            <Input variant='underlined' type={"text"} placeholder={"Title"} size={'sm'}/>*/}
            {/*            <Input variant='underlined' type={"url"} placeholder={"URL"} size={'sm'}/>*/}
            {/*        </div>*/}
            {/*    </CardHeader>*/}
            {/*</Card>*/}

            <div className="flex flex-wrap justify-center gap-2 ">
                {buttons.map((button) => <LinkButtonComponent key={button.key}
                                                              label={button.label}
                                                              icon={button.icon}/>)}
            </div>


            <Button className="w-full text-md" variant={"shadow"} color="success" startContent={<FaPlus/>}>Add
                New
                Links</Button>
        </div>
    )
}