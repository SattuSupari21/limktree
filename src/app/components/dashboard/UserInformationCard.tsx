import {
    Button,
    Card,
    CardBody,
    Image,
    Link, Popover, PopoverContent, PopoverTrigger
} from "@nextui-org/react";
import {FaLink} from "react-icons/fa6";
import React, {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {userState} from "@/store/atoms/user";
import {GetUserCustomUrl, UpdateBackgroundColor} from "@/app/actions";
import {VscSymbolColor} from "react-icons/vsc";
import {backgrounds, profileUser} from "@/app/constants";

type UserSettings = {
    customUrl: string,
    backgroundColor?: string,
}

export default function UserInformationCard() {
    const user = useRecoilValue(userState);
    const [userSettings, setUserSettings] = useState<UserSettings>();
    const [background, setBackground] = useState<string | null>("bg-blue-400");
    const [backgroundType, setBackgroundType] = useState<string>();

    useEffect(() => {
        GetUserCustomUrl().then(res => setUserSettings({
            customUrl: res.customUrl.customUrl,
            backgroundColor: res.customUrl.backgroundColor
        }))
    }, []);

    useEffect(() => {
        if (userSettings?.backgroundColor) setBackground(userSettings.backgroundColor)
        setBackgroundType(backgrounds.find(bg => bg.bg === userSettings?.backgroundColor)?.type);
    }, [userSettings?.backgroundColor]);

    function handleBackgroundColorUpdate(bg: string) {
        UpdateBackgroundColor(bg).then(r => r);
    }

    function RenderBackgrounds() {
        return (
            <div className="grid grid-cols-3 gap-2">
                {backgrounds.map((item) => {
                    return <Card shadow="sm" isPressable>
                        <CardBody className={` p-0 w-32 h-32 ${item.bg}`}
                                  onClick={() => {
                                      setBackground(item.bg);
                                      setBackgroundType(item.type);
                                      handleBackgroundColorUpdate(item.bg)
                                  }}/>
                    </Card>
                })}
            </div>
        );
    }

    function BgSelector() {
        return (
            <Popover placement="bottom">
                <PopoverTrigger>
                    <Button isIconOnly variant={"flat"} color={"default"} aria-label="change-background">
                        <VscSymbolColor className="w-6 h-6"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="px-1 py-2">
                        <RenderBackgrounds/>
                    </div>
                </PopoverContent>
            </Popover>
        )
    }

    const text = backgroundType === "dark" ? "text-white" : "text-black";

    return <div>
        <p className="text-4xl font-bold mb-4">User Dashboard</p>
        <Card>
            <CardBody>
                <div
                    className={`flex flex-col ${background} w-full h-56 rounded-md`}>
                    <div className="ml-auto mt-2 mr-2">
                        <BgSelector/>
                    </div>

                    <div className="flex flex-col gap-2 items-center justify-center">
                        <div className="w-24 h-24 rounded-full object-contain overflow-hidden">
                            <Image
                                isBlurred={true}
                                alt="user profile image"
                                src={user.profilePicture ? user.profilePicture : profileUser}
                            />
                        </div>
                        <div className="grid place-items-center">
                            <p className={`text-xl font-semibold ${text}`}>{user.firstname} {user.lastname}</p>
                            <Link href={'/' + userSettings?.customUrl} className={text} isExternal={true}><FaLink
                                className="mr-1"/>limktree.com/{userSettings?.customUrl}</Link>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    </div>
}