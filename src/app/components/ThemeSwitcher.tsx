"use client";

import {useTheme} from "next-themes";
import React, {useEffect, useState} from "react";
import {Button} from "@nextui-org/react";
import {IoMoonOutline, IoSunnyOutline} from "react-icons/io5";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme} = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    if (theme === 'dark') {
        return <Button isIconOnly color="default" size={'sm'} aria-label="light mode" onClick={() => setTheme('light')}>
            <IoSunnyOutline/>
        </Button>
    }

    if (theme === 'light') {
        return <Button isIconOnly color="default" size={'sm'} aria-label="dark mode" onClick={() => setTheme('dark')}>
            <IoMoonOutline/>
        </Button>
    }
};