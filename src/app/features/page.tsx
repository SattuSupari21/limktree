"use client"

import Header from "@/app/components/landing/components/Header";
import {Button} from "@nextui-org/react";
import {IoMdArrowBack} from "react-icons/io";
import React from "react";
import {useRouter} from "next/navigation";
import {featureSections} from "@/app/constants";

function RenderFeaturesSection({heading, description}: { heading: string, description: string }) {
    return <section className="flex flex-col gap-2">
        <p className="text-md lg:text-2xl md:text-xl font-semibold">
            {heading}
        </p>
        <p className="text-sm lg:text-lg md:text-md whitespace-pre-wrap">{description}</p>
    </section>
}

export default function Features() {
    const router = useRouter();
    return (
        <div>
            <Header/>
            <div
                className="w-full max-w-[1024px] px-6 my-4 mx-auto h-auto flex flex-col justify-center gap-8">
                <Button isIconOnly color="default" variant={'flat'} size={'sm'} aria-label="go back"
                        onClick={() => router.back()}>
                    <IoMdArrowBack/>
                </Button>
                {featureSections.map((feature) => <RenderFeaturesSection heading={feature.heading}
                                                                         description={feature.description}/>)}
            </div>
        </div>
    )
}