import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);

    if (isNaN(id)) {
        return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    try {
        const deleted = await prisma.student.delete({
            where: { id },
        });

        return NextResponse.json(deleted);
    } catch (error) {
        console.error("Gagal menghapus siswa:", error);
        return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 });
    }
}
