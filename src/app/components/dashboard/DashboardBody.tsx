import {IoMdArrowBack} from "react-icons/io";
import {Button, Card, CardBody, Image, Link} from "@nextui-org/react";
import React from "react";
import {FaLink} from "react-icons/fa6";
import LinkComponent from "@/app/components/LinkComponent";

export default function DashboardBody() {
    return (

        <div className="w-full h-full flex flex-col gap-4 px-6 max-w-[1024px]">
            <Button isIconOnly color="default" variant={'flat'} size={'sm'} aria-label="go back"
            >
                <IoMdArrowBack/>
            </Button>
            <div className="mt-4 flex flex-col gap-4">
                <p className="text-4xl font-bold">User Dashboard</p>
                <div>
                    <Card>
                        <CardBody>
                            <div
                                className="flex flex-col gap-2 items-center justify-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 w-full h-48 rounded-md">
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
                <p className="text-lg font-medium">Your Links</p>
                <LinkComponent/>
            </div>
        </div>
    )
}