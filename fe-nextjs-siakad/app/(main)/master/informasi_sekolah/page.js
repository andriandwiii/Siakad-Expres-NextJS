"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import TabelInformasiSekolah from "./components/tabelInformasiSekolah"; // Ensure the path is correct
import FormInformasiSekolah from "./components/formDialogInformasiSekolah"; // Ensure the path is correct
import HeaderBar from "@/app/components/headerbar";
import ToastNotifier from "/app/components/toastNotifier";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

// API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const InformasiSekolahPage = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const [formData, setFormData] = useState({
    ID_SEKOLAH: 0,
    NAMA_SEKOLAH: "",
    ALAMAT: "",
    JENJANG_AKREDITASI: "",
    TANGGAL_AKREDITASI: null, // Updated to Date type
    NPSN: "",
    STATUS: "",
  });

  const [errors, setErrors] = useState({});
  const toastRef = useRef(null);

  useEffect(() => {
    fetchInformasiSekolah();
  }, []);

  const fetchInformasiSekolah = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/informasi-sekolah`);
      setData(res.data);
      setOriginalData(res.data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate text fields
    if (!formData.NAMA_SEKOLAH?.trim()) newErrors.NAMA_SEKOLAH = "Nama Sekolah wajib diisi";
    if (!formData.ALAMAT?.trim()) newErrors.ALAMAT = "Alamat wajib diisi";
    if (!formData.JENJANG_AKREDITASI?.trim()) newErrors.JENJANG_AKREDITASI = "Jenjang Akreditasi wajib diisi";

    // Validate Date (TANGGAL_AKREDITASI)
    if (!(formData.TANGGAL_AKREDITASI instanceof Date) || isNaN(formData.TANGGAL_AKREDITASI)) {
      newErrors.TANGGAL_AKREDITASI = "Tanggal Akreditasi wajib diisi";
    }

    if (!formData.NPSN?.trim()) newErrors.NPSN = "NPSN wajib diisi";
    if (!formData.STATUS?.trim()) newErrors.STATUS = "Status wajib diisi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = (keyword) => {
    if (!keyword) {
      setData(originalData);
    } else {
      const filtered = originalData.filter(
        (item) =>
          item.NAMA_SEKOLAH.toLowerCase().includes(keyword.toLowerCase()) ||
          item.ALAMAT.toLowerCase().includes(keyword.toLowerCase())
      );
      setData(filtered);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const isEdit = !!formData.ID_SEKOLAH;
    const url = isEdit
      ? `${API_URL}/informasi-sekolah/${formData.ID_SEKOLAH}`
      : `${API_URL}/informasi-sekolah`;

    try {
      if (isEdit) {
        await axios.put(url, formData);
        toastRef.current?.showToast("00", "Data berhasil diperbarui");
      } else {
        await axios.post(url, formData);
        toastRef.current?.showToast("00", "Data berhasil ditambahkan");
      }
      fetchInformasiSekolah();
      setDialogVisible(false);
      resetForm();
    } catch (err) {
      console.error("Gagal menyimpan data:", err);
      toastRef.current?.showToast("01", "Gagal menyimpan data");
    }
  };

  const handleEdit = (row) => {
    setFormData({ ...row });
    setDialogVisible(true);
  };

  const handleDelete = (row) => {
    confirmDialog({
      message: `Apakah Anda yakin ingin menghapus informasi sekolah ${row.NAMA_SEKOLAH}?`,
      header: "Konfirmasi Hapus",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Ya",
      rejectLabel: "Batal",
      accept: async () => {
        try {
          await axios.delete(`${API_URL}/informasi-sekolah/${row.ID_SEKOLAH}`);
          fetchInformasiSekolah();
          toastRef.current?.showToast("00", "Data berhasil dihapus");
        } catch (err) {
          console.error("Gagal menghapus data:", err);
          toastRef.current?.showToast("01", "Gagal menghapus data");
        }
      },
    });
  };

  const resetForm = () => {
    setFormData({
      ID_SEKOLAH: 0,
      NAMA_SEKOLAH: "",
      ALAMAT: "",
      JENJANG_AKREDITASI: "",
      TANGGAL_AKREDITASI: null,  // Reset to null
      NPSN: "",
      STATUS: "",
    });
    setErrors({});
  };

  return (
    <div className="card">
      <ToastNotifier ref={toastRef} />
      <ConfirmDialog />

      <h3 className="text-xl font-semibold mb-3">Master Informasi Sekolah</h3>

      <div className="flex items-center justify-end">
        <HeaderBar
          title=""
          placeholder="Cari Sekolah"
          onSearch={handleSearch}
          onAddClick={() => {
            resetForm();
            setDialogVisible(true);
          }}
        />
      </div>

      <TabelInformasiSekolah
        data={data}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormInformasiSekolah
        visible={dialogVisible}
        onHide={() => {
          setDialogVisible(false);
          resetForm();
        }}
        onChange={setFormData}
        onSubmit={handleSubmit}
        formData={formData}
        errors={errors}
      />
    </div>
  );
};

export default InformasiSekolahPage;
