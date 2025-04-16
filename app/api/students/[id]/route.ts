
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

// interface RouteContext {
//     params: {
//         id: string
//     }
// }

// export async function DELETE(request: Request, context: RouteContext) {
//     const id = Number(context.params.id)

//     if (!id || isNaN(id)) {
//         return NextResponse.json({ error: "ID tidak valid" }, { status: 400 })
//     }

//     try {
//         const deleted = await prisma.student.delete({
//             where: { id },
//         })

//         return NextResponse.json(deleted)
//     } catch (error) {
//         console.error("Gagal menghapus siswa:", error)
//         return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 })
//     }
// }

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = Number((await params).id);


        if (!id) {
            return NextResponse.json({ error: "Semua field harus diisi." }, { status: 400 });
        }

        await prisma.student.delete({
            where: { id },
        });

        return NextResponse.json({ "message": "Success delete" });
    } catch (error) {
        return NextResponse.json({ error: "Gagal update data" }, { status: 500 });
    }
}


// PUT: Update siswa
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = Number((await params).id);
        const { name, phone, address, hobby } = await req.json();

        if (!name || !phone || !address || !hobby) {
            return NextResponse.json({ error: "Semua field harus diisi." }, { status: 400 });
        }

        const existingStudent = await prisma.student.findUnique({
            where: { id },
        });

        if (!existingStudent) {
            return NextResponse.json({ error: "Siswa tidak ditemukan." }, { status: 404 });
        }

        const updated = await prisma.student.update({
            where: { id },
            data: { name, phone, address, hobby },
        });

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: "Gagal update data" }, { status: 500 });
    }
}


