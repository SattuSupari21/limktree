"use client"

import Header from "@/app/components/landing/components/Header";
import DashboardBody from "@/app/components/dashboard/DashboardBody";
import React from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function Dashboard() {
    return (
        <div>
            <Header/>
            <div className="w-full flex justify-center items-center pt-4">
                <ProtectedRoute>
                    <DashboardBody/>
                </ProtectedRoute>
            </div>
        </div>
    )
}