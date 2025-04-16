/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

// GET: Ambil semua siswa
export async function GET() {
    try {
        const students = await prisma.student.findMany();
        return NextResponse.json(students);
    } catch (error) {
        return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
    }
}

// POST: Tambah siswa
export async function POST(req: Request) {
    try {
        const { name, phone, address, hobby } = await req.json();

        if (!name || !phone || !address || !hobby) {
            return NextResponse.json({ error: "Semua field harus diisi." }, { status: 400 });
        }

        const student = await prisma.student.create({
            data: { name, phone, address, hobby },
        });

        return NextResponse.json(student);
    } catch (error) {
        return NextResponse.json({ error: "Gagal menambahkan data" }, { status: 500 });
    }
}

// PUT: Update siswa
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
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
