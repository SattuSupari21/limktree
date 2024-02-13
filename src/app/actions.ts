"use server";

import {cookies} from "next/headers";
import {prisma} from "../../lib/db";
import cloudinary from "cloudinary"
import {generateToken, verifyToken} from "../../utils/auth";
import {revalidatePath} from "next/cache";
import {LinkButtonSchema, LoginBodySchema, SignupBodySchema, UserUpdateBodySchema} from "../../lib/types";

export async function LoginUser({email, password}: {
    email: string;
    password: string;
}) {
    // server side validation
    const newUser = {email, password}
    const result = LoginBodySchema.safeParse(newUser);
    if (!result.success) {
        const allErrors = result.error.issues;
        let errorMessages = "";
        allErrors.map((error) => {
            errorMessages = errorMessages + error.message + "\n";
        })
        return {error: errorMessages}
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
                password
            }
        })
        // if user doesn't exist
        if (!user) return {error: "Invalid email or password!", status: 411};

        let userId = user.id
        const token = generateToken(userId)

        cookies().set("auth", token);
        return {
            user: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                description: user.description,
                profilePicture: user.profilePictureUrl,
            },
            status: 200,
        };
    } catch (error) {
        return {error: (error as Error).message}
    }
}

export async function LogoutUser() {
    cookies().delete("auth");
    revalidatePath('/');
}

export async function SignupUser({firstname, lastname, email, password, customUrl}: {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    customUrl: string
}) {
    // server side validation
    const newUser = {firstname, lastname, email, password, customUrl}
    const result = SignupBodySchema.safeParse(newUser);
    if (!result.success) {
        const allErrors = result.error.issues;
        let errorMessages = "";
        allErrors.map((error) => {
            errorMessages = errorMessages + error.message + "\n";
        })
        return {error: errorMessages};
    }
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
        // return if user already exists
        if (existingUser) return {message: "Email already taken", status: 411};

        // create new user
        const newUser = await prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
                password,
            }
        })
        let userId = newUser.id
        const token = generateToken(userId)

        const urlExists = await prisma.userSettings.findUnique({
            where: {
                customUrl
            }
        })
        if (urlExists) return {message: "Custom Url already taken", status: 411};

        await prisma.userSettings.create({
            data: {
                userId: newUser.id,
                customUrl
            }
        })

        cookies().set("auth", token);

        return {
            message: "User created successfully",
            user: {
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                email: newUser.email,
                description: newUser.description,
            },
            status: 200,
        };
    } catch (error) {
        return {error: (error as Error).message}
    }
}

export async function UpdateUser({firstname, lastname, description, profilePicture}: {
    firstname: string,
    lastname: string,
    description?: string,
    profilePicture?: string,
}) {
    // server side validation
    const newUser = {firstname, lastname, description, profilePicture}
    const result = UserUpdateBodySchema.safeParse(newUser);
    if (!result.success) {
        const allErrors = result.error.issues;
        let errorMessages = "";
        allErrors.map((error) => {
            errorMessages = errorMessages + error.message + "\n";
        })
        return {error: errorMessages};
    }
    try {
        const token = cookies().get("auth")?.value;

        if (!token) return {message: "Error: token not found", status: 401};

        const userId = parseInt(<string>verifyToken(token));
        if (!userId) return {message: "Error: Invalid token", status: 401};

        cloudinary.v2.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
        })

        let imageUrl = null;
        if (profilePicture) {
            await cloudinary.v2.uploader.upload(profilePicture, (error, result) => {
                if (error) {
                    console.log(error);
                }
            }).then(function (result) {
                imageUrl = result.secure_url
            })
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                firstname,
                lastname,
                description,
                profilePictureUrl: imageUrl
            }
        })

        return {
            message: 'Successfully updated user',
            updatedUser,
            status: 200
        }
    } catch (error) {
        return {error: (error as Error).message};
    }
}

export async function GetUser() {
    try {
        const token = cookies().get("auth")?.value;

        if (!token) return {message: "Error: token not found", status: 401};

        const userId = parseInt(<string>verifyToken(token));
        if (!userId) return {message: "Error: Invalid token", status: 401};

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        return {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            description: user.description,
            profilePicture: user.profilePictureUrl,
            status: 200
        }
    } catch (error) {
        return {error: (error as Error).message};
    }
}

export async function GetUserLinks() {
    try {
        const token = cookies().get('auth')?.value;

        if (!token) return {message: "Error: token not found", status: 401};

        const userId = parseInt(<string>verifyToken(token));
        if (!userId) return {message: "Error: Invalid token", status: 401};

        const links = await prisma.link.findMany({
            where: {
                userId
            },
            orderBy: {
                position: 'asc'
            }
        });

        if (!links) return {message: "No links found", status: 200};

        return {links};
    } catch (error) {
        return {error: (error as Error).message}
    }
}

export async function CreateNewLink({title, url, position}: { title: string, url: string, position: number }) {
    // server side validation
    const newLink = {title, url, position}
    const result = LinkButtonSchema.safeParse(newLink);
    if (!result.success) {
        const allErrors = result.error.issues;
        let errorMessages = "";
        allErrors.map((error) => {
            errorMessages = errorMessages + error.message + "\n";
        })
        return {error: errorMessages};
    }

    try {
        const token = cookies().get('auth')?.value;

        if (!token) return {message: "Error: token not found", status: 401};

        const userId = parseInt(<string>verifyToken(token));
        if (!userId) return {message: "Error: Invalid token", status: 401};

        const titleExists = await prisma.link.findFirst({
            where: {
                title,
                userId
            }
        })
        if (titleExists) {
            const newLink = await prisma.link.update({
                where: {
                    id: titleExists.id
                },
                data: {
                    title,
                    url,
                    position
                }
            })
            return {
                message: 'Successfully updated link',
                newLink,
                status: 200
            };
        }

        const newLink = await prisma.link.create({
            data: {
                userId,
                title,
                url,
                position
            }
        })

        return {
            message: 'Successfully created new link',
            newLink,
            status: 200
        }
    } catch (error) {
        return {error: (error as Error).message};
    }
}

export async function DeleteLink(linkId: number) {
    try {
        const token = cookies().get('auth')?.value;

        if (!token) return {message: "Error: token not found", status: 401};

        const userId = parseInt(<string>verifyToken(token));
        if (!userId) return {message: "Error: Invalid token", status: 401};

        const deleteLink = await prisma.link.delete({
            where: {
                id: linkId,
            }
        })

        return {
            message: 'Successfully deleted link',
            deleteLink,
            status: 200
        };
    } catch (error) {
        return {error: (error as Error).message};
    }
}

export async function GetLinks(customUrl: string) {
    const userId = await prisma.userSettings.findUnique({
        where: {
            customUrl
        },
        select: {
            userId: true
        }
    }).then(response => response?.userId)

    if (!userId) return {error: "Invalid customUrls", status: 404}

    const links = await prisma.link.findMany({
        where: {
            userId
        },
        orderBy: {
            position: 'asc'
        }
    })

    const userDetails = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            firstname: true,
            lastname: true,
            description: true,
            profilePictureUrl: true,
        }
    })

    const userSettings = await prisma.userSettings.findUnique({
        where: {
            userId
        },
        select: {
            backgroundColor: true,
        }
    })

    return {links, userDetails, userSettings, status: 200};
}

export async function UpdateLinksPosition({firstId, firstPosition, secondId, secondPosition}: {
    firstId: number,
    firstPosition: number,
    secondId: number,
    secondPosition: number
}) {
    try {
        await prisma.link.update({
            where: {
                id: firstId
            },
            data: {
                position: secondPosition
            }
        })
        await prisma.link.update({
            where: {
                id: secondId
            },
            data: {
                position: firstPosition
            }
        })
        const token = cookies().get('auth')?.value;

        if (!token) return {message: "Error: token not found", status: 401};

        const userId = parseInt(<string>verifyToken(token));
        const links = await prisma.link.findMany({
            where: {
                userId
            },
            orderBy: {
                position: 'asc'
            }
        })
        revalidatePath('/dashboard')
        return {
            message: 'Successfully updated user',
            links,
            status: 200
        }

    } catch (error) {
        return {error: (error as Error).message};
    }
}

export async function GetUserCustomUrl() {
    try {
        const token = cookies().get('auth')?.value;

        if (!token) return {message: "Error: token not found", status: 401};

        const userId = parseInt(<string>verifyToken(token));
        if (!userId) return {message: "Error: Invalid token", status: 401};

        const customUrl = await prisma.userSettings.findUnique({
            where: {
                userId
            },
            select: {
                customUrl: true,
                backgroundColor: true,
            }
        })
        if (customUrl) {
            return {
                message: 'Successfully updated user',
                customUrl,
                status: 200
            }
        }

        return {status: 200}
    } catch (error) {
        return {error: (error as Error).message};
    }
}

export async function UpdateBackgroundColor(backgroundColor: string | null) {
    try {
        const token = cookies().get('auth')?.value;

        if (!token) return {message: "Error: token not found", status: 401};

        const userId = parseInt(<string>verifyToken(token));
        if (!userId) return {message: "Error: Invalid token", status: 401};

        if (backgroundColor) {
            const updatedBackgroundColor = await prisma.userSettings.update({
                where: {
                    userId
                },
                data: {
                    backgroundColor
                }
            })
            return {status: 200}
        } else throw new Error;
    } catch (error) {
        return {error: (error as Error).message};
    }
}