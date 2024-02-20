"use client"

import {Button, CircularProgress} from "@nextui-org/react";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {CreateNewLink, DeleteLink, GetUserLinks, UpdateLinksPosition} from "@/app/actions";
import {FaPlus} from "react-icons/fa6";
import {Input} from "@nextui-org/input";
import {buttons} from "@/app/constants";
import {IconBaseProps, IconType} from "react-icons";
import {IoMdSave} from "react-icons/io";
import {AiOutlineDelete} from "react-icons/ai";
import {useRecoilState} from "recoil";
import {linkState} from "@/store/atoms/links";
import toast, {Toaster} from "react-hot-toast";
import {MdDragIndicator} from "react-icons/md";
import {LinkButtonSchema} from "../../../lib/types";

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
    const [links, setLinks] = useState<Link[]>([]);
    const dragLink = useRef<number>(0);
    const dragOverLink = useRef<number>(0);
    const [activeButtons, setActiveButtons] = useState([]);
    const [availableButtons, setAvailableButtons] = useState(buttons.filter(b => !activeButtons.find((btn: LinkButton) => btn.key === b.key)));

    type LinkInputFieldType = {
        title: string,
        url: string
    }

    const [inputFields, setInputFields] = useState<LinkInputFieldType[]>([]);

    useEffect(() => {
        GetUserLinks().then(function (result) {
            setLinksLoading({isLoading: false});
            setLinks(result.links);
        })
    }, []);

    useMemo(() => {
        // @ts-ignore
        setActiveButtons(buttons.filter((b: LinkButton) => links.find((l: Link) => l.title === b.label)))
        let counter = 0;
        let newInputFields: LinkInputFieldType[] = []
        links.map((link) => {
            newInputFields.push({title: link.title, url: link.url});
            counter = counter + 1;
        })
        setInputFields(newInputFields);
    }, [links])

    useMemo(() => {
        setAvailableButtons(buttons.filter(b => !activeButtons.find((btn: LinkButton) => btn.key === b.key)))
    }, [activeButtons]);


    function addButton(button: LinkButton) {
        // @ts-ignore
        setActiveButtons((prev) => {
            return [...prev, button];
        });
        const newInputFields = [...inputFields];
        newInputFields.push({
            title: button.label,
            url: ''
        });
        setInputFields(newInputFields);
    }

    function handleNewLink() {
        interface NewLinkType extends LinkInputFieldType {
            position: number
        }

        let linkArray: NewLinkType[] = [];
        let counter = 0;

        inputFields.map((input) => {
            const title = input.title;
            const url = input.url;
            const position = ++counter;
            const newLink: NewLinkType = {title, url, position}
            linkArray.push(newLink)
        })

        const result = LinkButtonSchema.safeParse(linkArray);
        if (!result.success) {
            const allErrors = result.error.issues;
            let errors = "";
            allErrors.map((error) => {
                errors = error.message;
            })
            toast.error(errors);
            return;
        }

        toast.promise(
            // @ts-ignore
            CreateNewLink(linkArray).then(function (result) {
                if (result.status === 200) {
                    GetUserLinks().then(function (result) {
                        setLinks(result.links);
                    })
                } else {
                    console.log(result.error)
                }
            }),
            {
                loading: 'Saving...',
                success: <b>Saved successfully!</b>,
                error: <b>Could not save.</b>,
            }
        ).then(() => {
            let newInputFields: LinkInputFieldType[] = []
            links.map((link) => {
                newInputFields.push({title: link.title, url: link.url});
                counter = counter + 1;
            })
            setInputFields(newInputFields);
        });
    }

    function handleDeleteLink(button: LinkButton, index: number) {
        setActiveButtons(activeButtons.filter((b: LinkButton) => b.label !== button.label))
        const newInputFields = [...inputFields];
        newInputFields.splice(index, 1);
        setInputFields(newInputFields);
        const linkToDelete: Link | undefined = links.find((link: Link) => link.title === button.label);
        if (!linkToDelete) return

        toast.promise(
            // @ts-ignore
            DeleteLink(linkToDelete.id).then(function (result) {
                if (result.deleteLink) {
                    GetUserLinks().then(function (result) {
                        setLinks(result.links);
                    })
                }
            }),
            {
                loading: 'Deleting...',
                success: <b>Link deleted successfully</b>,
                error: <b>Could not save.</b>,
            }
        ).then(() => {
            return
        });
    }

    const onLinkChange = (value: string | null, index: number) => {
        if (value) {
            let newInputFields = [...inputFields];
            newInputFields[index].url = value;
            setInputFields(newInputFields);
        }
    }

    if (linksLoading.isLoading) {
        return <div className="grid place-items-center"><CircularProgress size="lg" aria-label="Loading..."/></div>
    }

    function handleSort() {
        const linksClone: Link[] = [...links]
        const temp = linksClone[dragLink.current]
        linksClone[dragLink.current] = linksClone[dragOverLink.current]
        linksClone[dragOverLink.current] = temp;

        const firstId = linksClone[dragOverLink.current].id;
        const firstPosition = linksClone[dragOverLink.current].position;
        const secondId = linksClone[dragLink.current].id;
        const secondPosition = linksClone[dragLink.current].position;

        setLinks(linksClone)

        UpdateLinksPosition({firstId, firstPosition, secondId, secondPosition}).then(r => setLinks(r.links));
    }

    return (
        <div className="w-full h-full flex flex-col">
            {/*user links*/}
            <div>
                {links.map((link: Link, index) => {
                    const button: LinkButton = {
                        key: link.id.toString(),
                        label: link.title,
                        icon: buttons.find((b: LinkButton) => b.label === link.title)?.icon
                    }
                    let Icon: IconType = button.icon as (props: IconBaseProps) => JSX.Element;
                    return <div
                        key={button.key}
                        draggable={true}
                        onDragStart={() => dragLink.current = index}
                        onDragEnter={() => dragOverLink.current = index}
                        onDragEnd={handleSort}
                        onDragOver={(e) => e.preventDefault()}
                    >

                        <div className="flex gap-2 items-center mb-2">
                            <MdDragIndicator className="cursor-grab"/>
                            <div className="flex-1 grid grid-cols-4 place-items-center gap-6" key={button.key}
                                 draggable={true}
                                 onDragStart={(e) => {
                                     e.preventDefault()
                                     e.stopPropagation()
                                 }}>
                                <div className="flex gap-2 justify-center items-center mr-auto">
                                    <Icon/>
                                    <p>{button.label}</p>
                                </div>
                                <div className="flex justify-center items-center col-span-3 w-full gap-2">
                                    <Input variant={'underlined'} type={"text"} placeholder={"URL"}
                                           size={'sm'} defaultValue={link.url}
                                           onChange={(e) => onLinkChange(e.target.value, index)}/>
                                    <Button isIconOnly color="danger" variant="faded" aria-label="delete link"
                                            onClick={() => {
                                                handleDeleteLink(button, index)
                                            }}>
                                        <AiOutlineDelete/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>

            {/*link buttons*/}
            <div>
                {activeButtons.map((button: LinkButton, index) => {
                    let Icon: IconType = button.icon as (props: IconBaseProps) => JSX.Element;
                    if (!links.find((l: Link) => l.title === button.label)) {
                        return <div className="flex gap-2 items-center mb-2">
                            <MdDragIndicator className="cursor-grab active:cursor-grabbing"/>
                            <div className="flex-1 grid grid-cols-4 place-items-center gap-6">
                                <div className="flex gap-2 justify-center items-center mr-auto">
                                    <Icon/>
                                    <p>{button.label}</p>
                                </div>
                                <div className="flex justify-center items-center col-span-3 w-full gap-2">
                                    <Input variant={'underlined'} type={"text"} placeholder={"URL"}
                                           size={'sm'}
                                           onChange={(e) => onLinkChange(e.target.value, index)}/>
                                    <Button isIconOnly color="danger" variant="faded" aria-label="delete link"
                                            onClick={() => {
                                                handleDeleteLink(button, index)
                                            }}>
                                        <AiOutlineDelete/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    }
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

            <div className="w-full flex items-center justify-center mt-6">
                <Button color="success" variant="solid" aria-label="save link"
                        startContent={<IoMdSave/>}
                        className="w-full max-w-48 flex"
                        onClick={() => {
                            handleNewLink()
                        }}>
                    Save
                </Button>
            </div>
            <Toaster/>
        </div>
    )
}