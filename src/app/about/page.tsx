"use client"

import Header from "@/app/components/landing/components/Header";
import {aboutSections} from "@/app/constants";
import {IoMdArrowBack} from "react-icons/io";
import {Button} from "@nextui-org/react";
import React from "react";
import {useRouter} from "next/navigation";

function RenderAboutSection({heading, description}: { heading: string, description: string }) {
    return <section className="flex flex-col gap-2">
        <p className="text-md lg:text-2xl md:text-xl font-semibold">
            {heading}
        </p>
        <p className="text-sm lg:text-lg md:text-md whitespace-pre-wrap">{description}</p>
    </section>
}

export default function About() {
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
                <p className="text-lg lg:text-4xl md:text-2xl font-bold text-center">🌟 About Limktree</p>
                <p className="text-md lg:text-xl md:text-lg text-center mb-6">
                    Welcome to Limktree, the ultimate platform for curating and sharing your favorite
                    links! We believe in simplifying online connections and making your digital presence truly
                    memorable.
                </p>
                {aboutSections.map((about) => <RenderAboutSection key={about.heading} heading={about.heading}
                                                                  description={about.description}/>)}
            </div>
        </div>
    )
}