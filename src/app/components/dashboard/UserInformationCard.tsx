import {Card, CardBody, Image, Link} from "@nextui-org/react";
import {FaLink} from "react-icons/fa6";
import React from "react";

export default function UserInformationCard() {
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
                            src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg"
                        />
                    </div>
                    <div className="grid place-items-center">
                        <p className="text-xl font-semibold">Samtu Sumpari</p>
                        <Link href="/" className="text-white" isExternal={true}><FaLink
                            className="mr-1"/>limktree.com/samtu</Link>
                    </div>
                </div>
            </CardBody>
        </Card>
    </div>
}