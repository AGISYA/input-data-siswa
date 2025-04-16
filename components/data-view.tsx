"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";
import EditModal from "./edit-modal"; // Pastikan EditModal sudah ada
import { IoPencil } from "react-icons/io5";
import { DeletButton } from "./button"; // Pastikan DeletButton sudah diimpor dengan benar
import { Student } from "@prisma/client";

export function DataViewLayout() {
  const [data, setData] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null); // State untuk menyimpan data yang sedang diedit
  const [showModal, setShowModal] = useState(false); // State untuk menampilkan popup

  const fetchData = async () => {
    try {
      const res = await fetch("/api/students");
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError("Gagal mengambil data siswa");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-sm text-gray-600">Loading data...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  const handleEditClick = (student: Student) => {
    setSelectedStudent(student); // Set selected student for editing
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setSelectedStudent(null); // Clear selected student
  };

  return (
    <div className="bg-white p-6 rounded-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Data Siswa Tersimpan
      </h2>

      {data.length === 0 ? (
        <p className="text-sm text-gray-600">
          Belum ada data yang ditambahkan.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-left text-gray-600 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone Number</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Hobby</th>
                <th className="px-4 py-3">Created At</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((student, index) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-gray-800">{student.name}</td>
                  <td className="px-4 py-3 text-gray-800">{student.phone}</td>
                  <td className="px-4 py-3 text-gray-800">{student.address}</td>
                  <td className="px-4 py-3 text-gray-800">{student.hobby}</td>
                  <td className="px-4 py-3 text-gray-800">
                    {formatDate(student.createdAt.toString())}
                  </td>
                  <td className="flex gap-1 px-4 py-3">
                    <button
                      className="rounded-sm border p-1 hover:bg-gray-100"
                      onClick={() => handleEditClick(student)} // Open edit modal on click
                    >
                      <IoPencil size={20} />
                    </button>
                    <DeletButton
                      id={String(student.id)}
                      onDeleteSuccess={fetchData}
                    />

                    {/* Pastikan ID dikirim sebagai string */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Overlay background with opacity */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={handleCloseModal} // Close modal when clicking outside
        ></div>
      )}

      {/* Edit Modal */}
      {showModal && selectedStudent && (
        <EditModal
          student={selectedStudent}
          onClose={handleCloseModal}
          onSubmit={async (updatedStudent) => {
            await fetch(`/api/students/${updatedStudent.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedStudent),
            });
            fetchData(); // Refresh data
          }}
        />
      )}
    </div>
  );
}
