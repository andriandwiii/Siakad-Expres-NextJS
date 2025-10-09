"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import ToastNotifier from "../../../../components/ToastNotifier";

// Opsi status siswa
const statusOptions = [
  { label: "Aktif", value: "Aktif" },
  { label: "Lulus", value: "Lulus" },
  { label: "Nonaktif", value: "Nonaktif" },
];

// Opsi gender
const genderOptions = [
  { label: "Laki-laki", value: "L" },
  { label: "Perempuan", value: "P" },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const FormSiswa = ({ visible, onHide, reloadData, siswaData }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const toast = useRef(null);

  useEffect(() => {
    if (siswaData) setFormData(siswaData);
    else setFormData({});
  }, [siswaData]);

  const inputClass = (field) =>
    `p-inputtext w-full ${errors[field] ? "p-invalid" : ""}`;

  const resetForm = () => {
    setFormData({});
    setErrors({});
  };

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.NIS?.trim()) newErrors.NIS = "NIS wajib diisi";
    if (!formData.NISN?.trim()) newErrors.NISN = "NISN wajib diisi";
    if (!formData.NAMA?.trim()) newErrors.NAMA = "Nama wajib diisi";
    if (!formData.EMAIL?.trim()) newErrors.EMAIL = "Email wajib diisi";
    if (!formData.SISWA_ID && !formData.password?.trim())
      newErrors.password = "Password wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (formData.SISWA_ID) {
        // === EDIT SISWA ===
        await axios.put(`${API_URL}/siswa/${formData.SISWA_ID}`, formData);
        showToast("success", "Berhasil", "Data siswa berhasil diperbarui");
      } else {
        // === TAMBAH SISWA ===
        const payload = {
          NIS: formData.NIS,
          NISN: formData.NISN,
          NAMA: formData.NAMA,
          GENDER: formData.GENDER,
          TGL_LAHIR: formData.TGL_LAHIR,
          EMAIL: formData.EMAIL,
          password: formData.password,
          STATUS: formData.STATUS || "Aktif",
        };

        await axios.post(`${API_URL}/auth/register-siswa`, payload);
        showToast("success", "Berhasil", "Siswa baru berhasil ditambahkan");
      }

      resetForm();
      onHide();
      reloadData && reloadData();
    } catch (err) {
      console.error("Gagal menyimpan data:", err);
      showToast(
        "error",
        "Gagal",
        err.response?.data?.message || "Terjadi kesalahan server"
      );
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <ToastNotifier />
      <Dialog
        header={formData.SISWA_ID ? "Edit Siswa" : "Tambah Siswa"}
        visible={visible}
        onHide={() => {
          resetForm();
          onHide();
        }}
        className="rounded-lg shadow-lg"
        style={{ width: "40rem" }}
      >
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {/* NIS */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              NIS
            </label>
            <InputText
              className={inputClass("NIS")}
              value={formData.NIS || ""}
              onChange={(e) =>
                setFormData({ ...formData, NIS: e.target.value })
              }
            />
          </div>

          {/* NISN */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              NISN
            </label>
            <InputText
              className={inputClass("NISN")}
              value={formData.NISN || ""}
              onChange={(e) =>
                setFormData({ ...formData, NISN: e.target.value })
              }
            />
          </div>

          {/* Nama */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700">
              Nama
            </label>
            <InputText
              className={inputClass("NAMA")}
              value={formData.NAMA || ""}
              onChange={(e) =>
                setFormData({ ...formData, NAMA: e.target.value })
              }
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Jenis Kelamin
            </label>
            <Dropdown
              value={formData.GENDER || ""}
              options={genderOptions}
              onChange={(e) =>
                setFormData({ ...formData, GENDER: e.value })
              }
              className="w-full"
              placeholder="Pilih gender"
            />
          </div>

          {/* Tanggal Lahir */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Tanggal Lahir
            </label>
            <Calendar
              value={formData.TGL_LAHIR ? new Date(formData.TGL_LAHIR) : null}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  TGL_LAHIR: e.value
                    ? e.value.toISOString().split("T")[0]
                    : "",
                })
              }
              dateFormat="yy-mm-dd"
              showIcon
              className="w-full"
            />
          </div>

          {/* Email */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <InputText
              className={inputClass("EMAIL")}
              value={formData.EMAIL || ""}
              onChange={(e) =>
                setFormData({ ...formData, EMAIL: e.target.value })
              }
            />
          </div>

          {/* Status */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700">
              Status
            </label>
            <Dropdown
              value={formData.STATUS || "Aktif"}
              options={statusOptions}
              onChange={(e) => setFormData({ ...formData, STATUS: e.value })}
              className="w-full"
              placeholder="Pilih status"
            />
          </div>

          {/* Password hanya saat tambah */}
          {!formData.SISWA_ID && (
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <InputText
                type="password"
                className={inputClass("password")}
                value={formData.password || ""}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          )}

          {/* Tombol Simpan */}
          <div className="col-span-2 text-right pt-4">
            <Button
              type="submit"
              label="Simpan"
              icon="pi pi-save"
              className="p-button-sm p-button-primary"
            />
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default FormSiswa;
