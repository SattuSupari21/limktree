"use client";

import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {GetUser} from "@/app/actions";
import {CircularProgress} from "@nextui-org/react";
import {useRecoilValue} from "recoil";
import {userEmailState} from "@/store/selectors/userEmail";

const ProtectedRoute = ({children}: { children: React.JSX.Element }) => {
    const router = useRouter();

    const userEmail = useRecoilValue(userEmailState);

    const [isUserLoading, setIsUserLoading] = useState(true);

    useEffect(() => {
        GetUser().then(function (result) {
            if (result.message === "Error" || result.message === "Error: Invalid token") {
                setIsUserLoading(false);
            } else {
                setIsUserLoading(false);
            }
        })
    }, []);

    if (!userEmail && !isUserLoading) {
        router.push('/');
    }

    if (isUserLoading) return <CircularProgress color="default" aria-label="Loading..." size={'lg'}/>

    if (!isUserLoading && userEmail) return <>{children}</>;
};

export default ProtectedRoute;
