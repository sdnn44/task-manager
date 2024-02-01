import { connectToDatabase } from "@/app/utils/server-helper";
import prisma from "@/prisma/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        if (!userId)
            return NextResponse.json({ error: "Unauthorized", status: 401 })

        const { title, description, date, completed, important } = await req.json();
        if (!title || !description || !date) {
            return NextResponse.json({
                error: "Missing required fields",
                status: 400
            })
        }

        if (title.length < 3) {
            return NextResponse.json({
                error: "Title must be at least 3 characters",
                status: 400
            })
        }
        await connectToDatabase();
        const task = await prisma.task.create({
            data: {
                title,
                description,
                date,
                isCompleted: completed,
                isImportant: important,
                userId,
            }
        });
        return NextResponse.json(task);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Error while creating task", status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET(req: Request) {
    try {
        const { userId } = auth();
        if (!userId)
            return NextResponse.json({ error: "Unauthorized", status: 401 });

        await connectToDatabase();
        const tasks = await prisma.task.findMany({
            where: {
                userId,
            },
        });
        return NextResponse.json(tasks);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Error while getting task", status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function PUT(req: Request) {
    try {
        const { userId } = auth();
        if (!userId)
            return NextResponse.json({ error: "Unauthorized", status: 401 })

        const { isCompleted, id } = await req.json();
        await connectToDatabase();
        const task = await prisma.task.update({
            where: {
                id,
            },
            data: {
                isCompleted,
            }
        });
        return NextResponse.json(task);
    } catch (error) {
        return NextResponse.json({ error: "Error while editing task", status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function DELETE(req: Request) {
    try {

    } catch (error) {
        return NextResponse.json({ error: "Error while deleting task", status: 500 });
    }
}
