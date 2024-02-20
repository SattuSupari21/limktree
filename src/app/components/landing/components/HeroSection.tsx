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
                <Button as={Link} color="primary" href="/auth/signup" variant="shadow" size={'md'}>
                    Claim your limks
                </Button>
            </div>
        )
    }

    return (
        <div className="w-full grid place-items-center">
            <div className="max-w-[1024px] flex flex-col items-center justify-center mt-24 px-4 gap-8">
                <div className="flex flex-col items-center gap-4">
                    <p className="text-xl lg:text-5xl md:text-2xl font-bold text-center">Streamline Your Social Presence
                        with limktree! 🚀</p>
                    <p className="text-sm lg:text-xl md:text-lg text-center">Connect with your audience effortlessly by
                        organizing all your
                        important links in one place. Whether
                        you're a content creator, business owner, or influencer, our platform makes it easy to share
                        your
                        social media profiles, websites, products, and more with a single link.</p>
                    <p className="text-sm lg:text-xl md:text-lg text-center">Get started in minutes and unlock the full
                        potential of your online
                        presence. Sign up now and join
                        thousands of users who are simplifying their social sharing experience with limktree
                        !</p>
                </div>
                <div>
                    {userEmail && !userLoading ?
                        <Button as={Link} color="success" href="/dashboard" variant="shadow" size={'md'}>
                            Go to Dashboard
                        </Button> : <UserLoading/>}

                </div>
            </div>
        </div>

    )
}