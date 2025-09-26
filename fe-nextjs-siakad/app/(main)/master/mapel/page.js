"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import TabelMapel from "./components/tabelMapel"; // Pastikan path benar
import FormMapel from "./components/formDialogMapel"; // Pastikan path benar
import HeaderBar from "@/app/components/headerbar";
import ToastNotifier from "/app/components/toastNotifier";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const MapelPage = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const [formData, setFormData] = useState({
    MAPEL_ID: 0,
    KODE_MAPEL: "",
    NAMA_MAPEL: "",
    DESKRIPSI: "",
    KATEGORI: "",
    STATUS: "",
  });

  const [errors, setErrors] = useState({});
  const toastRef = useRef(null);

  // Fetch semua Mapel
  useEffect(() => {
    fetchMapel();
  }, []);

  const fetchMapel = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/master-mapel`);
      setData(res.data);
      setOriginalData(res.data);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
      toastRef.current?.showToast("01", "Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  };

  // Validasi Form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.KODE_MAPEL?.trim()) newErrors.KODE_MAPEL = "Kode Mapel wajib diisi";
    if (!formData.NAMA_MAPEL?.trim()) newErrors.NAMA_MAPEL = "Nama Mapel wajib diisi";
    if (!formData.KATEGORI?.trim()) newErrors.KATEGORI = "Kategori wajib diisi";
    if (!formData.STATUS?.trim()) newErrors.STATUS = "Status wajib diisi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Pencarian
  const handleSearch = (keyword) => {
    if (!keyword) {
      setData(originalData);
    } else {
      const filtered = originalData.filter(
        (item) =>
          item.KODE_MAPEL.toLowerCase().includes(keyword.toLowerCase()) ||
          item.NAMA_MAPEL.toLowerCase().includes(keyword.toLowerCase()) ||
          item.KATEGORI.toLowerCase().includes(keyword.toLowerCase())
      );
      setData(filtered);
    }
  };

  // Submit form (POST/PUT)
  const handleSubmit = async () => {
    if (!validateForm()) return;

    const isEdit = !!formData.MAPEL_ID;
    const url = isEdit
      ? `${API_URL}/master-mapel?id=${formData.MAPEL_ID}`
      : `${API_URL}/master-mapel`;

    try {
      if (isEdit) {
        await axios.put(url, formData);
        toastRef.current?.showToast("00", "Data berhasil diperbarui");
      } else {
        await axios.post(url, formData);
        toastRef.current?.showToast("00", "Data berhasil ditambahkan");
      }
      fetchMapel();
      setDialogVisible(false);
      resetForm();
    } catch (err) {
      console.error("Gagal menyimpan data:", err);
      toastRef.current?.showToast("01", "Gagal menyimpan data");
    }
  };

  // Edit mapel
  const handleEdit = (row) => {
    setFormData({ ...row });
    setDialogVisible(true);
  };

  // Hapus mapel
  const handleDelete = (row) => {
    confirmDialog({
      message: `Apakah Anda yakin ingin menghapus Mapel ${row.NAMA_MAPEL}?`,
      header: "Konfirmasi Hapus",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Ya",
      rejectLabel: "Batal",
      accept: async () => {
        try {
          await axios.delete(`${API_URL}/master-mapel?id=${row.MAPEL_ID}`);
          fetchMapel();
          toastRef.current?.showToast("00", "Data berhasil dihapus");
        } catch (err) {
          console.error("Gagal menghapus data:", err);
          toastRef.current?.showToast("01", "Gagal menghapus data");
        }
      },
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      MAPEL_ID: 0,
      KODE_MAPEL: "",
      NAMA_MAPEL: "",
      DESKRIPSI: "",
      KATEGORI: "",
      STATUS: "",
    });
    setErrors({});
  };

  return (
    <div className="card">
      <ToastNotifier ref={toastRef} />
      <ConfirmDialog />

      <h3 className="text-xl font-semibold mb-3">Master Mata Pelajaran</h3>

      <div className="flex items-center justify-end mb-2">
        <HeaderBar
          title=""
          placeholder="Cari Mapel"
          onSearch={handleSearch}
          onAddClick={() => {
            resetForm();
            setDialogVisible(true);
          }}
        />
      </div>

      <TabelMapel
        data={data}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormMapel
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

export default MapelPage;
