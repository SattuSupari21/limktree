import {Card, CardBody, Image, Link} from "@nextui-org/react";
import {FaLink} from "react-icons/fa6";
import React, {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {userState} from "@/store/atoms/user";
import {GetUserCustomUrl} from "@/app/actions";

export default function UserInformationCard() {
    const user = useRecoilValue(userState);
    const [customUrl, setCustomUrl] = useState<string>();

    useEffect(() => {
        GetUserCustomUrl().then(res => setCustomUrl(res.customUrl.customUrl))
    }, []);

    return <div>
        <p className="text-4xl font-bold mb-4">User Dashboard</p>
        <Card>
            <CardBody>
                <div
                    className="flex flex-col gap-2 items-center justify-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 w-full h-52 rounded-md">
                    <div className="w-24 h-24 rounded-full object-contain overflow-hidden">
                        <Image
                            isBlurred={true}
                            alt="user profile image"
                            src={user.profilePicture ? user.profilePicture : "/profile.jpg"}
                        />
                    </div>
                    <div className="grid place-items-center">
                        <p className="text-xl font-semibold">{user.firstname} {user.lastname}</p>
                        <Link href={'/' + customUrl} className="text-white" isExternal={true}><FaLink
                            className="mr-1"/>limktree.com/{customUrl}</Link>
                    </div>
                </div>
            </CardBody>
        </Card>
    </div>
}