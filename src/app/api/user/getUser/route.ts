import {NextRequest, NextResponse} from "next/server";
import {prisma} from "../../../../../lib/db";
import {verifyToken} from "../../../../../utils/auth";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("auth")?.value;

        if (!token) return new NextResponse(JSON.stringify({message: "Error"}), {status: 404});

        const userId = parseInt(<string>verifyToken(token));
        if (!userId)
            return new NextResponse(
                JSON.stringify({message: "Error: Invalid token"}), {status: 404});

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        return new NextResponse(
            JSON.stringify({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                description: user.description
            }),
        );
    } catch (error) {
        console.error(error);
    }
}
