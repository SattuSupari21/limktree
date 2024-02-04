import {Button, Card, CardBody, CardHeader, Image} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {CreateNewLink, GetUserLinks} from "@/app/actions";
import {FaPlus} from "react-icons/fa6";
import {Input} from "@nextui-org/input";
import {buttons} from "@/app/constants";
import {IconBaseProps, IconType} from "react-icons";
import {IoMdSave} from "react-icons/io";
import {AiOutlineDelete} from "react-icons/ai";

type LinkButton = {
    key: string,
    label: string,
    icon: IconType | undefined
}

type Link = {
    id: number,
    title: string,
    url: string,
    thumbnailUrl?: string,
    position: number
}

export default function LinkButtonComponent() {
    const [links, setLinks] = useState([]);
    const [url, setUrl] = useState("");
    const [activeButtons, setActiveButtons] = useState([]);

    let availableButtons = buttons.filter(b => !activeButtons.find((btn: LinkButton) => btn.key === b.key))

    useEffect(() => {
        GetUserLinks().then(function (result) {
            setLinks(result.links);
        })
    }, []);

    availableButtons = buttons.filter((b: LinkButton) => !links.find((l: Link) => l.title === b.label))

    function addButton(button: LinkButton) {
        // @ts-ignore
        setActiveButtons((prev) => {
            return [...prev, button];
        });
    }

    function handleNewLink(button: LinkButton) {
        const title = button.label
        const position = links.length + 1;
        if (url.length < 1) return
        CreateNewLink({title, url, position}).then(function (result) {
            console.log(result.newLink)
            if (result.newLink) {
                GetUserLinks().then(function (result) {
                    setLinks(result.links);
                })
            }
        })
    }

    function UserLinksComponent({button, value}: { button: LinkButton, value?: string }) {
        let Icon: IconType = button.icon as (props: IconBaseProps) => JSX.Element;
        return (
            <div className="grid grid-cols-4 place-items-center gap-6 mb-2" key={button.key}>
                <div className="flex gap-2 justify-center items-center mr-auto">
                    <Icon/>
                    <p>{button.label}</p>
                </div>
                <div className="flex justify-center items-center col-span-3 w-full gap-2">
                    <Input variant={'underlined'} type={"text"} placeholder={"URL"} value={value} size={'sm'}
                           onChange={(e) => setUrl(e.target.value)}/>
                    <Button isIconOnly color="success" variant="faded" aria-label="save link"
                            onClick={() => handleNewLink(button)}>
                        <IoMdSave/>
                    </Button>
                    <Button isIconOnly color="danger" variant="faded" aria-label="delete link"
                            onClick={() => setActiveButtons(activeButtons.filter((b: LinkButton) => b.key !== button.key))}>
                        <AiOutlineDelete/>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div>
                {links.map((link: Link) => {
                    const button: LinkButton = {
                        key: link.id.toString(),
                        label: link.title,
                        icon: buttons.find((b: LinkButton) => b.label === link.title)?.icon
                    }
                    return <UserLinksComponent button={button} value={link.url}/>
                })}
            </div>
            <div>
                {activeButtons.map((button: LinkButton) => <UserLinksComponent button={button}/>)}
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-4">
                {availableButtons.map((button) => {
                    let key = button.key;
                    let label = button.label;
                    let Icon = button.icon;
                    return <Button key={key} className="text-sm" variant={"bordered"}
                                   color="default"
                                   startContent={<Icon/>} endContent={<FaPlus/>}
                                   onClick={() => addButton(button)}>{label}</Button>
                })}
            </div>
        </div>
    )
}