"use client";

import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Skeleton,
} from "@nextui-org/react";
import {useRecoilValue} from "recoil";
import {userEmailState} from "@/store/selectors/userEmail";
import {isUserLoading} from "@/store/selectors/isUserLoading";
import {ThemeSwitcher} from "@/app/components/ThemeSwitcher";

export default function Header() {
    const menuItems = ["Features", "About", "Login"];

    const userEmail = useRecoilValue(userEmailState);
    const userLoading = useRecoilValue(isUserLoading);

    function RenderAuthButtons() {
        if (userLoading)
            return <Skeleton className="flex rounded-full w-10 h-10"/>;

        return (
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Button
                        as={Link}
                        color="primary"
                        href="/auth/login"
                        variant="bordered"
                    >
                        Login
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button
                        as={Link}
                        color="secondary"
                        href="/auth/signup"
                        variant="bordered"
                    >
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
        );
    }

    function RenderUserAccount() {
        return (
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Button
                        as={Link}
                        color="success"
                        href="/auth/login"
                        variant="bordered"
                    >
                        Dashboard
                    </Button>
                </NavbarItem>
            </NavbarContent>
        );
    }

    return (
        <div>
            <Navbar isBlurred={true} isBordered>
                <NavbarContent className="sm:hidden" justify="start">
                    <NavbarMenuToggle/>
                </NavbarContent>

                <NavbarContent className="sm:hidden pr-3" justify="center">
                    <NavbarBrand>
                        <p className="font-bold text-inherit">limktree</p>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarBrand>
                        <p className="font-bold text-2xl text-inherit">limktree</p>
                    </NavbarBrand>
                    <NavbarItem>
                        <Link color="foreground" href="/features">
                            Features
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link href="/about" aria-current="page" color="foreground">
                            About
                        </Link>
                    </NavbarItem>
                </NavbarContent>

                <NavbarContent justify={'end'}>
                    <NavbarItem><ThemeSwitcher/></NavbarItem>
                    <NavbarItem>
                        {!userLoading && userEmail ? (
                            <RenderUserAccount/>
                        ) : (
                            <RenderAuthButtons/>
                        )}
                    </NavbarItem>
                </NavbarContent>

                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link className="w-full" href="#" size="lg">
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
        </div>
    );
}
