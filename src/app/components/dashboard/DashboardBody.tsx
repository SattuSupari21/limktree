import {IoMdArrowBack} from "react-icons/io";
import {Button, Link} from "@nextui-org/react";
import React from "react";
import {useRouter} from "next/navigation";
import UserInformationCard from "@/app/components/dashboard/UserInformationCard";
import GeneralInformationCard from "@/app/components/dashboard/GeneralInformationCard";
import LinkButtonsCard from "@/app/components/dashboard/LinkButtonsCard";

export default function DashboardBody() {
    const router = useRouter();
    return (
        <div className="w-full h-full flex flex-col gap-4 px-6 max-w-[1024px] pb-8">
            <Button isIconOnly color="default" variant={'flat'} size={'sm'} aria-label="go back"
                    onClick={() => router.back()}>
                <IoMdArrowBack/>
            </Button>
            <UserInformationCard/>
            <GeneralInformationCard/>
            <LinkButtonsCard/>
        </div>
    )
}