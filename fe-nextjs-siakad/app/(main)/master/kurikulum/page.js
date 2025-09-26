
"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import TabelKurikulum from "./components/tabelKurikulum"; // Pastikan pathnya benar
import FormKurikulum from "./components/formDialogKurikulum"; // Pastikan pathnya benar
import HeaderBar from "@/app/components/headerbar";
import ToastNotifier from "/app/components/toastNotifier";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const KurikulumPage = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const [formData, setFormData] = useState({
    KURIKULUM_ID: 0,
    NAMA_KURIKULUM: "",
    TAHUN: "",
    DESKRIPSI: "",
    STATUS: "",
  });

  const [errors, setErrors] = useState({});
  const toastRef = useRef(null);

  useEffect(() => {
    fetchKurikulum();
  }, []);

  const fetchKurikulum = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/kurikulum`);
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
    if (!formData.NAMA_KURIKULUM?.trim()) newErrors.NAMA_KURIKULUM = "Nama Kurikulum wajib diisi";
    if (!formData.TAHUN?.trim()) newErrors.TAHUN = "Tahun wajib diisi";
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
          item.NAMA_KURIKULUM.toLowerCase().includes(keyword.toLowerCase()) ||
          item.TAHUN.toLowerCase().includes(keyword.toLowerCase())
      );
      setData(filtered);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const isEdit = !!formData.KURIKULUM_ID;
    const url = isEdit
      ? `${API_URL}/kurikulum/${formData.KURIKULUM_ID}`
      : `${API_URL}/kurikulum`;

    try {
      if (isEdit) {
        await axios.put(url, formData);
        toastRef.current?.showToast("00", "Data berhasil diperbarui");
      } else {
        await axios.post(url, formData);
        toastRef.current?.showToast("00", "Data berhasil ditambahkan");
      }
      fetchKurikulum();
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
      message: `Apakah Anda yakin ingin menghapus kurikulum ${row.NAMA_KURIKULUM}?`,
      header: "Konfirmasi Hapus",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Ya",
      rejectLabel: "Batal",
      accept: async () => {
        try {
          await axios.delete(`${API_URL}/kurikulum/${row.KURIKULUM_ID}`);
          fetchKurikulum();
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
      KURIKULUM_ID: 0,
      NAMA_KURIKULUM: "",
      TAHUN: "",
      DESKRIPSI: "",
      STATUS: "",
    });
    setErrors({});
  };

  return (
    <div className="card">
      <ToastNotifier ref={toastRef} />
      <ConfirmDialog />

      <h3 className="text-xl font-semibold mb-3">Master Kurikulum</h3>

      <div className="flex items-center justify-end">
        <HeaderBar
          title=""
          placeholder="Cari Kurikulum"
          onSearch={handleSearch}
          onAddClick={() => {
            resetForm();
            setDialogVisible(true);
          }}
        />
      </div>

      <TabelKurikulum
        data={data}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormKurikulum
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

export default KurikulumPage;
