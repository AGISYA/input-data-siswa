"use server";

export async function deleteContact(id: string) {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/students/${id}`, {
        method: "DELETE",
    });
}
