import { prisma } from "@/lib/prisma";

export async function DELETE(
    req: Request,
    context: { params: { id: string } }
): Promise<Response> {
    const id = Number(context.params.id);

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

        return new Response(JSON.stringify(deleted));
    } catch (error) {
        console.error("Gagal menghapus siswa:", error);
        return new Response(
            JSON.stringify({ error: "Gagal menghapus data" }),
            { status: 500 }
        );
    }
}
