"use client"

import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import {CircularProgress, Link} from "@nextui-org/react";
import React from "react";
import {useRecoilValue} from "recoil";
import {userEmailState} from "@/store/selectors/userEmail";
import {isUserLoading} from "@/store/selectors/isUserLoading";

export default function HeroSection() {
    const userEmail = useRecoilValue(userEmailState);
    const userLoading = useRecoilValue(isUserLoading);

    function UserLoading() {
        if (userLoading) {
            return <CircularProgress size="lg" aria-label="Loading..."/>
        }
        return (
            <div className="flex justify-center items-center gap-2">
                <Input type="text" placeholder="lynks/yourname" variant={'faded'} size={'sm'} className="flex-1"/>
                <Button as={Link} color="primary" href="/auth/signup" variant="shadow" size={'lg'}>
                    Claim your limks
                </Button>
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-center items-center xl:px-72 lg:px-28 sm:p-28 py-36 gap-8">
            <div className="flex flex-col items-center gap-4">
                <p className="text-8xl font-bold text-center">Everything you are. In one, simple link in bio.</p>
                <p className="text-2xl text-center">Join 40M+ people using Linktree for their link in bio. One link to
                    help you
                    share everything you
                    create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media
                    profiles.</p>
            </div>
            <div>
                {userEmail && !userLoading ?
                    <Button as={Link} color="success" href="/dashboard" variant="shadow" size={'lg'}>
                        Go to Dashboard
                    </Button> : <UserLoading/>}

            </div>
        </div>
    )
}