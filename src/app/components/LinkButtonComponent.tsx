import {Button, CircularProgress} from "@nextui-org/react";
import {useEffect, useMemo, useRef, useState} from "react";
import {CreateNewLink, DeleteLink, GetUserLinks} from "@/app/actions";
import {FaPlus} from "react-icons/fa6";
import {Input} from "@nextui-org/input";
import {buttons} from "@/app/constants";
import {IconBaseProps, IconType} from "react-icons";
import {IoMdSave} from "react-icons/io";
import {AiOutlineDelete} from "react-icons/ai";
import {useRecoilState} from "recoil";
import {linkState} from "@/store/atoms/links";

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
    const [linksLoading, setLinksLoading] = useRecoilState(linkState);
    const [links, setLinks] = useState([]);
    const inputRef = useRef(null);
    const [activeButtons, setActiveButtons] = useState([]);
    const [availableButtons, setAvailableButtons] = useState(buttons.filter(b => !activeButtons.find((btn: LinkButton) => btn.key === b.key)));

    useEffect(() => {
        GetUserLinks().then(function (result) {
            setLinks(result.links);
        })
    }, []);

    useEffect(() => {
        setLinksLoading({isLoading: false});
    }, [links]);


    useMemo(() => {
        // @ts-ignore
        setActiveButtons(buttons.filter((b: LinkButton) => links.find((l: Link) => l.title === b.label)))
    }, [links])

    useMemo(() => {
        setAvailableButtons(buttons.filter(b => !activeButtons.find((btn: LinkButton) => btn.key === b.key)))
    }, [activeButtons]);

    function addButton(button: LinkButton) {
        // @ts-ignore
        setActiveButtons((prev) => {
            return [...prev, button];
        });
    }

    function handleNewLink(button: LinkButton) {
        const title = button.label
        const position = links.length + 1;
        if (!inputRef.current) return
        // @ts-ignore
        CreateNewLink({title, url: inputRef.current.value, position}).then(function (result) {
            if (result.newLink) {
                GetUserLinks().then(function (result) {
                    setLinks(result.links);
                })
            }
        })
    }

    function handleDeleteLink(button: LinkButton) {
        setActiveButtons(activeButtons.filter((b: LinkButton) => b.key !== button.key))
        // @ts-ignore
        const linkToDelete: Link = links.find((link: Link) => link.title === button.label);
        if (!linkToDelete) return
        DeleteLink(linkToDelete.id).then(function (result) {
            if (result.deleteLink) {
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
                           ref={inputRef}/>
                    <Button isIconOnly color="success" variant="faded" aria-label="save link"
                            onClick={() => handleNewLink(button)}>
                        <IoMdSave/>
                    </Button>
                    <Button isIconOnly color="danger" variant="faded" aria-label="delete link"
                            onClick={() => handleDeleteLink(button)}>
                        <AiOutlineDelete/>
                    </Button>
                </div>
            </div>
        )
    }

    if (linksLoading.isLoading) {
        return <div className="grid place-items-center"><CircularProgress size="lg" aria-label="Loading..."/></div>
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
                {activeButtons.map((button: LinkButton) => {
                    if (!links.find((l: Link) => l.title === button.label))
                        return <UserLinksComponent key={button.key} button={button}/>
                })}
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