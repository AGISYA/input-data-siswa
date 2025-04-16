import { prisma } from "@/lib/prisma"
import { type NextRequest, NextResponse } from "next/server"

// DELETE: Hapus siswa berdasarkan ID
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const id = Number(params.id)

    if (!id || isNaN(id)) {
        return NextResponse.json({ error: "ID tidak valid" }, { status: 400 })
    }

    try {
        const deleted = await prisma.student.delete({
            where: { id },
        })

        return NextResponse.json(deleted)
    } catch (error) {
        console.error("Gagal menghapus siswa:", error)
        return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 })
    }
}
