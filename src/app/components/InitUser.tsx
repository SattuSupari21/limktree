"use client"

import {useRecoilValue, useSetRecoilState} from "recoil";
import {userState} from "@/store/atoms/user";
import {GetUser} from "@/app/actions";
import React, {useEffect} from "react";
import {userEmailState} from "@/store/selectors/userEmail";

export function InitUser() {
    const setUser = useSetRecoilState(userState);
    const user = useRecoilValue(userEmailState);

    const init = () => {
        GetUser().then(function (result) {
            if (result.status !== 200) {
                setUser({
                    firstname: null,
                    lastname: null,
                    email: null,
                    description: null,
                    profilePicture: null,
                    isLoading: false,
                });
            } else {
                setUser({
                    firstname: result.firstname,
                    lastname: result.lastname,
                    email: result.email,
                    description: result.description,
                    profilePicture: result.profilePicture,
                    isLoading: false,
                });
            }
        });
    }

    useEffect(() => {
        init();
    }, []);

    return <></>
}