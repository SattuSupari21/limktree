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

        const {title, url, position} = await req.json();
        const newLink = await prisma.link.create({
            data: {
                userId,
                title,
                url,
                position
            }
        })

        return new NextResponse(
            JSON.stringify({
                message: 'Successfully created new link',
                newLink
            }),
        );
    } catch (error) {
        console.error(error);
    }
}
