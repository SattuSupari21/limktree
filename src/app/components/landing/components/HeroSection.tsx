import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import {Link} from "@nextui-org/react";
import React from "react";

export default function HeroSection() {
    return (
        <div className="flex flex-col justify-center items-center p-48 gap-8">
            <div className="flex flex-col items-center gap-4">
                <p className="text-8xl font-bold text-center">Everything you are. In one, simple link in bio.</p>
                <p className="text-2xl text-center">Join 40M+ people using Linktree for their link in bio. One link to
                    help you
                    share everything you
                    create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media
                    profiles.</p>
            </div>
            <div className="flex justify-center items-center gap-2">
                <Input type="text" placeholder="lynks/yourname" variant={'faded'} size={'sm'} className="flex-1"/>
                <Button as={Link} color="primary" href="#" variant="shadow" className="font-medium">
                    Claim your lynks
                </Button>
            </div>
        </div>
    )
}