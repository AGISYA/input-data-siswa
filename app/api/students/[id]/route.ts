import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

interface RouteContext {
    params: {
        id: string
    }
}

export async function DELETE(request: Request, context: RouteContext) {
    const id = Number(context.params.id)

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
