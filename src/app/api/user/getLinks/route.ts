import {NextRequest, NextResponse} from "next/server";
import {prisma} from "../../../../../lib/db";
import {verifyToken} from "../../../../../utils/auth";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("auth")?.value;

        if (!token) return new NextResponse(JSON.stringify({message: "Error"}));

        const userId = parseInt(<string>verifyToken(token));
        if (!userId)
            return new NextResponse(
                JSON.stringify({message: "Error: Invalid token"}),
            );

        const links = await prisma.link.findMany({
            where: {
                userId
            },
        });

        if (!links) return new NextResponse(JSON.stringify({message: "No links found"}), {status: 404})

        return new NextResponse(
            JSON.stringify({
                links
            }),
        );
    } catch (error) {
        return new NextResponse(JSON.stringify({error: "An error occurred"}))
    }
}
