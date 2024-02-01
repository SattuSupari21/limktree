import {NextRequest, NextResponse} from "next/server";
import {prisma} from "../../../../../lib/db";
import {generateToken} from "../../../../../utils/auth";

export async function POST(req: NextRequest) {
    const {firstname, lastname, email, password} = await req.json()
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
                password
            }
        })
        let userId = newUser.id
        const token = generateToken(userId)

        return new NextResponse(JSON.stringify({message: "User created successfully", token}), {
            status: 200,
        });
    } catch (error) {
        console.error(error)
    }
}