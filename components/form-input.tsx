"use client";

import { useState } from "react";

export function FormInputLayout() {
  const [formData, setFormData] = useState({
    nama: "",
    telepon: "",
    alamat: "",
    hobi: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.nama,
          phone: formData.telepon,
          address: formData.alamat,
          hobby: formData.hobi,
        }),
      });

      if (!res.ok) {
        throw new Error("Gagal menyimpan data.");
      }

      alert("Data berhasil disimpan!");
      setFormData({ nama: "", telepon: "", alamat: "", hobi: "" });
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-md border border-gray-200">
      <h2 className="text-lg font-semibold mb-1">Form Input Data</h2>
      <p className="text-sm text-gray-600 mb-6">
        Masukkan data personal Anda pada form berikut.
      </p>

      <form autoComplete="off">
        <div className="mb-4">
          <label htmlFor="nama" className="block mb-2 font-medium">
            Nama
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="telepon" className="block mb-2 font-medium">
            Nomor Telepon
          </label>
          <input
            type="tel"
            id="telepon"
            name="telepon"
            value={formData.telepon}
            onChange={handleChange}
            placeholder="Masukkan nomor telepon"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="alamat" className="block mb-2 font-medium">
            Alamat
          </label>
          <textarea
            id="alamat"
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            rows={4}
            placeholder="Masukkan alamat lengkap"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div className="mb-6">
          <label htmlFor="hobi" className="block mb-2 font-medium">
            Hobi
          </label>
          <input
            type="text"
            id="hobi"
            name="hobi"
            value={formData.hobi}
            onChange={handleChange}
            placeholder="Masukkan hobi Anda"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800"
        >
          Simpan Data
        </button>
      </form>
    </div>
  );
}
