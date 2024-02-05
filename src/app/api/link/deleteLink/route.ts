import {NextRequest, NextResponse} from "next/server";
import {prisma} from "../../../../../lib/db";
import {verifyToken} from "../../../../../utils/auth";

export async function DELETE(req: NextRequest) {
    try {
        const token = req.cookies.get("auth")?.value;

        if (!token) return new NextResponse(JSON.stringify({message: "Error"}));

        const userId = parseInt(<string>verifyToken(token));
        if (!userId) {
            return new NextResponse(
                JSON.stringify({message: "Error: Invalid token"}),
            );
        }

        const {linkId} = await req.json();
        const deleteLink = await prisma.link.delete({
            where: {
                id: linkId,
            }
        })

        return new NextResponse(
            JSON.stringify({
                message: 'Successfully deleted link',
                deleteLink
            }),
        );
    } catch (error) {
        console.error(error);
    }
}
