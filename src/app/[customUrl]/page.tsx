"use client"

// send customUrl to backend
// get userId from backend using userSettings table
// use userId to find links from links table
// render links

// if no customUrl? -> redirect to '/'

import Profile from "@/app/components/linkPage/Profile";
import LinkCards from "@/app/components/linkPage/LinkCard";
import {useEffect, useState} from "react";
import {GetLinks} from "@/app/actions";
import {buttons} from "@/app/constants";
import {useRouter} from "next/navigation";
import {Spinner} from "@nextui-org/react";
import {useRecoilValue} from "recoil";
import {userState} from "@/store/atoms/user";

type Link = {
    id: number,
    title: string,
    url: string,
    thumbnailUrl?: string,
    position: number
}

type User = {
    firstname: string,
    lastname: string,
    description: string
}

export default function LinkPage({params}: { params: { customUrl: string } }) {
    const router = useRouter();
    const customUrl = params.customUrl;
    const [links, setLinks] = useState([]);
    const [user, setUser] = useState<User>();
    const [customUrlValidated, setCustomUrlValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        GetLinks(customUrl).then(function (result) {
            if (result.error) {
                setIsLoading(false);
                router.push('/');
                return;
            }
            setLinks(result.links);
            setUser(result.userDetails);
            setIsLoading(false);
            setCustomUrlValidated(true);
        })
    }, []);

    if (isLoading) return <div className="w-screen h-screen grid place-items-center"><Spinner
        label="Loading limktree..." color="secondary"/></div>

    if (customUrlValidated && !isLoading) return <div
        className="w-screen h-screen flex flex-col text-white items-center bg-gradient-to-r from-gray-700 via-gray-900 to-black">
        {user && <Profile firstname={user.firstname} lastname={user.lastname} description={user.description}/>}
        {
            links.map((link: Link) => {
                return <LinkCards key={link.id} title={link.title}
                                  icon={buttons.find((b) => b.label === link.title)?.icon}
                                  url={link.url}
                />
            })
        }
    </div>

}