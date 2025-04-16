import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// DELETE: Hapus siswa berdasarkan ID
export async function DELETE(req: Request, context: { params: { id: string } }): Promise<Response> {
    const id = Number(context.params.id); // Mengakses ID dari context.params

    if (!id || isNaN(id)) {
        return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    try {
        const deleted = await prisma.student.delete({
            where: { id },
        });

        return NextResponse.json(deleted); // Mengembalikan data siswa yang terhapus
    } catch (error) {
        console.error("Gagal menghapus siswa:", error);
        return NextResponse.json(
            { error: "Gagal menghapus data" },
            { status: 500 }
        );
    }
}
