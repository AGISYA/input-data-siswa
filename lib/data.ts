import { prisma } from "@/lib/prisma";

export const getDataStudents = async () => {
    try {
        const datastudents = await prisma.student.findMany({
        });
        return datastudents
    } catch (error) {
        throw new Error("Failed to fetch contact data")
    }

}
