import {NextRequest, NextResponse} from "next/server";
import {prisma} from "../../../../../lib/db";
import {generateToken} from "../../../../../utils/auth";

export async function POST(req: NextRequest) {
    const {firstname, lastname, email, password, customUrl} = await req.json()
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
        // return if user already exists
        if (existingUser) return new NextResponse(JSON.stringify({message: "Email already taken"}), {status: 411});

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
        if (urlExists) return new NextResponse(JSON.stringify({message: "Custom Url already taken"}), {status: 411});

        await prisma.userSettings.create({
            data: {
                userId: newUser.id,
                customUrl
            }
        })

        return new NextResponse(JSON.stringify({
            message: "User created successfully",
            token,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email
        }), {
            status: 200,
        });
    } catch (error) {
        console.error(error)
    }
}