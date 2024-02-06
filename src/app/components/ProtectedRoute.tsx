"use client"

import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {GetUser} from "@/app/actions";
import {CircularProgress} from "@nextui-org/react";

const ProtectedRoute = ({children}: { children: React.JSX.Element }) => {
    const router = useRouter();
    const [isUserLoading, setIsUserLoading] = useState(true);

    useEffect(() => {
        let isLoggedIn;
        GetUser().then(function (result) {
            if (result.message === "Error") isLoggedIn = false;
            else {
                isLoggedIn = true;
                setIsUserLoading(false);
            }
        })

        if (!isLoggedIn) {
            router.push('/auth/login');
        }
    }, []);

    if (isUserLoading) return <CircularProgress color="default" aria-label="Loading..." size={'lg'}/>

    return <>{children}</>;
};

export default ProtectedRoute;
