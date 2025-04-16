import { Student } from "@/app/generated/prisma";
import { useState } from "react";

interface EditModalProps {
  student: Student;
  onClose: () => void;
  onSubmit: (updated: Student) => void;
}

export default function EditModal({
  student,
  onClose,
  onSubmit,
}: EditModalProps) {
  const [formData, setFormData] = useState({
    name: student.name,
    phone: student.phone,
    address: student.address,
    hobby: student.hobby,
  });
  const [loading, setLoading] = useState(false); // Untuk state loading
  const [error, setError] = useState<string | null>(null); // Untuk state error

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    fetch(`http://localhost:3000/api/students`, {
      method: "PUT", // pastikan metode PUT
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: student.id,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        hobby: formData.hobby,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error); // Set error if any
        } else {
          onSubmit(data); // Update data setelah sukses
          onClose(); // Menutup modal
        }
      })
      .catch((error) => {
        console.error("Error updating student:", error);
        setError("Gagal memperbarui data siswa"); // Set generic error message
      })
      .finally(() => {
        setLoading(false); // Reset loading state
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Edit Data Siswa
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan nama siswa"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nomor Telepon
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan nomor telepon"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan alamat"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hobi
            </label>
            <input
              type="text"
              name="hobby"
              value={formData.hobby}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan hobi"
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
