import {NextRequest, NextResponse} from "next/server";
import {prisma} from "../../../../../lib/db";
import {generateToken, verifyToken} from "../../../../../utils/auth";

export async function POST(req: NextRequest) {
    const {email, password} = await req.json()
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
                password
            }
        })
        // if user doesn't exist
        if (!user) return new NextResponse(JSON.stringify({message: "Error while logging in "}), {status: 411});

        let userId = user.id
        const token = generateToken(userId)

        return new NextResponse(JSON.stringify({
            token,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            description: user.description
        }), {
            status: 200,
        });
    } catch (error) {
        console.error(error)
    }
}