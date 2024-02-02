"use client"

import {useSetRecoilState} from "recoil";
import {userState} from "@/store/atoms/user";
import {GetUser} from "@/app/actions";
import {useEffect} from "react";

export function InitUser() {
    const setUser = useSetRecoilState(userState);

    const init = () => {
        const user = GetUser();
        user.then(function (result) {
            setUser({
                firstname: result.firstname,
                lastname: result.lastname,
                email: result.email,
                isLoading: false,
            });
        });
    }

    useEffect(() => {
        init();
    }, []);

    return <></>
}