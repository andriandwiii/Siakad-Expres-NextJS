"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import TabelKelas from "./components/tabelKelas"; // Pastikan pathnya benar
import FormKelas from "./components/formDialogKelas"; // Pastikan pathnya benar
import HeaderBar from "@/app/components/headerbar";
import ToastNotifier from "/app/components/toastNotifier";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const KelasPage = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const [formData, setFormData] = useState({
    KELAS_ID: 0,
    KODE_KELAS: "",
    TINGKAT: "",
    JURUSAN: "",
    NAMA_KELAS: "",
    STATUS: "",
  });

  const [errors, setErrors] = useState({});
  const toastRef = useRef(null);

  useEffect(() => {
    fetchKelas();
  }, []);

  const fetchKelas = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/kelas`);
      setData(res.data);
      setOriginalData(res.data);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.KODE_KELAS?.trim()) newErrors.KODE_KELAS = "Kode Kelas wajib diisi";
    if (!formData.TINGKAT?.trim()) newErrors.TINGKAT = "Tingkat wajib diisi";
    if (!formData.JURUSAN?.trim()) newErrors.JURUSAN = "Jurusan wajib diisi";
    if (!formData.NAMA_KELAS?.trim()) newErrors.NAMA_KELAS = "Nama Kelas wajib diisi";
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
          item.KODE_KELAS.toLowerCase().includes(keyword.toLowerCase()) ||
          item.NAMA_KELAS.toLowerCase().includes(keyword.toLowerCase()) ||
          item.JURUSAN.toLowerCase().includes(keyword.toLowerCase())
      );
      setData(filtered);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const isEdit = !!formData.KELAS_ID;
    const url = isEdit
      ? `${API_URL}/kelas/${formData.KELAS_ID}`
      : `${API_URL}/kelas`;

    try {
      if (isEdit) {
        await axios.put(url, formData);
        toastRef.current?.showToast("00", "Data berhasil diperbarui");
      } else {
        await axios.post(url, formData);
        toastRef.current?.showToast("00", "Data berhasil ditambahkan");
      }
      fetchKelas();
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
      message: `Apakah Anda yakin ingin menghapus kelas ${row.NAMA_KELAS}?`,
      header: "Konfirmasi Hapus",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Ya",
      rejectLabel: "Batal",
      accept: async () => {
        try {
          await axios.delete(`${API_URL}/kelas/${row.KELAS_ID}`);
          fetchKelas();
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
      KELAS_ID: 0,
      KODE_KELAS: "",
      TINGKAT: "",
      JURUSAN: "",
      NAMA_KELAS: "",
      STATUS: "",
    });
    setErrors({});
  };

  return (
    <div className="card">
      <ToastNotifier ref={toastRef} />
      <ConfirmDialog />

      <h3 className="text-xl font-semibold mb-3">Master Kelas</h3>

      <div className="flex items-center justify-end">
        <HeaderBar
          title=""
          placeholder="Cari Kelas"
          onSearch={handleSearch}
          onAddClick={() => {
            resetForm();
            setDialogVisible(true);
          }}
        />
      </div>

      <TabelKelas
        data={data}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormKelas
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

export default KelasPage;
