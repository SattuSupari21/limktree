"use client"

import Header from "@/app/components/landing/components/Header";
import DashboardBody from "@/app/components/dashboard/DashboardBody";
import React from "react";
import {InitUser} from "@/app/components/InitUser";

export default function Dashboard() {
    return (
        <div>
            <Header/>
            <div className="w-full flex justify-center items-center pt-4">
                <DashboardBody/>
            </div>
        </div>
    )
}