"use client";

// send customUrl to backend
// get userId from backend using userSettings table
// use userId to find links from links table
// render links

// if no customUrl? -> redirect to '/'

import Profile from "@/app/components/linkPage/Profile";
import LinkCards from "@/app/components/linkPage/LinkCard";
import { useEffect, useState } from "react";
import { GetLinks } from "@/app/actions";
import { backgrounds, buttons } from "@/app/constants";
import { useRouter } from "next/navigation";
import { Button, Spinner } from "@nextui-org/react";

type Link = {
    id: number;
    title: string;
    url: string;
    thumbnailUrl?: string;
    position: number;
};

type User = {
    firstname: string;
    lastname: string;
    description: string;
    profilePictureUrl: string;
};

export default function LinkPage({
    params,
}: {
    params: { customUrl: string };
}) {
    const router = useRouter();
    const customUrl = params.customUrl;
    const [links, setLinks] = useState([]);
    const [user, setUser] = useState<User>();
    const [customUrlValidated, setCustomUrlValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [background, setBackground] = useState<string>();
    const [backgroundType, setBackgroundType] = useState<string>();

    useEffect(() => {
        GetLinks(customUrl).then(function (result) {
            if (result.error) {
                setIsLoading(false);
                router.push("/");
                return;
            }
            setLinks(result.links);
            setUser(result.userDetails);
            setBackground(result.userSettings.backgroundColor);
            setIsLoading(false);
            setCustomUrlValidated(true);
        });
    }, []);

    useEffect(() => {
        setBackgroundType(backgrounds.find((bg) => bg.bg === background)?.type);
    }, [background]);

    const color = backgroundType === "dark" ? "white" : "black";

    if (isLoading)
        return (
            <div className="w-screen h-screen grid place-items-center">
                <Spinner label="Loading limktree..." color="secondary" />
            </div>
        );

    if (customUrlValidated && !isLoading)
        return (
            <div
                className={`w-screen h-screen flex flex-col items-center text-${color} ${background} ? ${background} : bg-blue-400`}
            >
                {user && (
                    <Profile
                        firstname={user.firstname}
                        lastname={user.lastname}
                        description={user.description}
                        profilePicture={user.profilePictureUrl}
                    />
                )}
                {links.map((link: Link) => {
                    return (
                        <LinkCards
                            key={link.id}
                            title={link.title}
                            icon={
                                buttons.find((b) => b.label === link.title)
                                    ?.icon
                            }
                            url={link.url}
                            color={color}
                        />
                    );
                })}
                <Button
                    onClick={() => router.push("/")}
                    variant={"shadow"}
                    className="mt-auto mb-6 bg-white text-black text-md opacity-50"
                >
                    Create your limktree!
                </Button>
            </div>
        );
}
