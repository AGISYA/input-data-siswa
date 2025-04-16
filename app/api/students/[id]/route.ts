import { prisma } from "@/lib/prisma";

// DELETE: Hapus siswa berdasarkan ID
export async function DELETE(req: Request, { params }: { params: { id: string } }): Promise<Response> {
    const id = Number(params.id);

    if (!id || isNaN(id)) {
        return new Response(
            JSON.stringify({ error: "ID tidak valid" }),
            { status: 400 }
        );
    }

    try {
        const deleted = await prisma.student.delete({
            where: { id },
        });

        return new Response(JSON.stringify(deleted), { status: 200 });
    } catch (error) {
        console.error("Gagal menghapus siswa:", error);
        return new Response(
            JSON.stringify({ error: "Gagal menghapus data" }),
            { status: 500 }
        );
    }
}
