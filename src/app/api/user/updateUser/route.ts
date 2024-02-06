import {NextRequest, NextResponse} from "next/server";
import {prisma} from "../../../../../lib/db";
import {verifyToken} from "../../../../../utils/auth";

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get("auth")?.value;

        if (!token) return new NextResponse(JSON.stringify({message: "Error"}));

        const userId = parseInt(<string>verifyToken(token));
        if (!userId) {
            return new NextResponse(
                JSON.stringify({message: "Error: Invalid token"}),
            );
        }

        const {firstname, lastname, description} = await req.json();

        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                firstname,
                lastname,
                description
            }
        })

        return new NextResponse(
            JSON.stringify({
                message: 'Successfully updated user',
                updatedUser
            }),
        );
    } catch (error) {
        console.error(error);
    }
}
