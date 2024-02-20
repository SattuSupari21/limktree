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
    Skeleton, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
} from "@nextui-org/react";
import {useRecoilState, useRecoilValue} from "recoil";
import {userEmailState} from "@/store/selectors/userEmail";
import {isUserLoading} from "@/store/selectors/isUserLoading";
import {ThemeSwitcher} from "@/app/components/ThemeSwitcher";
import {userState} from "@/store/atoms/user";
import {LogoutUser} from "@/app/actions";
import {useRouter} from "next/navigation";
import {InitUser} from "@/app/components/InitUser";
import {revalidatePath} from "next/cache";
import {profileUser} from "@/app/constants";

export default function Header() {
    const router = useRouter();
    const menuItems = [{itemName: "Features", linkTo: "/features"}, {itemName: "About", linkTo: "/about"}, {
        itemName: "Login",
        linkTo: "/auth/login"
    }]

    const [user, setUser] = useRecoilState(userState);
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

    async function handleLogout() {
        await LogoutUser();
        router.push('/');
        setUser({
            firstname: null,
            lastname: null,
            email: null,
            description: null,
            profilePicture: null,
            isLoading: false,
        });
    }

    function RenderUserAccount() {
        return (
            <NavbarContent justify="end">
                <NavbarItem>
                    <Dropdown>
                        <DropdownTrigger>
                            <img
                                className="w-10 h-10 rounded-full bg-white cursor-pointer"
                                src={user.profilePicture ?? profileUser}
                                alt="profile-image"
                            ></img>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem key="dashboard"><Link href={'/dashboard'}
                                                                color={'foreground'}>Dashboard</Link></DropdownItem>
                            <DropdownItem key="delete" className="text-danger" color="danger"
                                          onClick={handleLogout}>
                                Log out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarItem>
            </NavbarContent>
        )
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
                            <Link className="w-full" href={item.linkTo} size="lg">
                                {item.itemName}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
        </div>
    );
}
