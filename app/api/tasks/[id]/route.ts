import { connectToDatabase } from "@/app/utils/server-helper";
import prisma from "@/prisma/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { userId } = auth();
        const { id } = params;

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        await connectToDatabase();
        const task = await prisma.task.delete({
            where: {
                id,
            },
        });
        return NextResponse.json(task);

    } catch (error) {
        console.log("Error while deleting task: ", error);
        return NextResponse.json({ error: "Error while deleting task", status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}