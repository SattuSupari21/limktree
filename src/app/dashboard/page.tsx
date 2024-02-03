"use client"

import Header from "@/app/components/landing/components/Header";
import DashboardBody from "@/app/components/dashboard/DashboardBody";
import {IoMdArrowBack} from "react-icons/io";
import {Button} from "@nextui-org/react";
import React from "react";
import {useRouter} from "next/navigation";

export default function Dashboard() {
    const router = useRouter();

    return (
        <div>
            <Header/>

            <div className="w-full flex justify-center items-center pt-4">
                <DashboardBody/>
            </div>


        </div>
    )
}