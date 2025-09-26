"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import TabelAset from "./components/tabelAset"; // Pastikan pathnya sesuai
import FormAset from "./components/formDialogAset"; // Pastikan pathnya sesuai
import HeaderBar from "@/app/components/headerbar";
import ToastNotifier from "/app/components/toastNotifier";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AsetPage = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const [formData, setFormData] = useState({
    ID: 0,
    NAMA_BARANG: "",
    MERK_TYPE: "",
    JUMLAH_BARANG: 1,
    ASAL_USUL_PEROLEHAN: "",
    PERIODE: "",
    KETERANGAN: "",
    STATUS: "Aktif",
  });

  const [errors, setErrors] = useState({});
  const toastRef = useRef(null);

  useEffect(() => {
    fetchAset();
  }, []);

  const fetchAset = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/master-aset-sekolah`);
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
    if (!formData.NAMA_BARANG?.trim()) newErrors.NAMA_BARANG = "Nama Barang wajib diisi";
    if (!formData.JUMLAH_BARANG || formData.JUMLAH_BARANG <= 0) newErrors.JUMLAH_BARANG = "Jumlah harus lebih dari 0";
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
          item.NAMA_BARANG.toLowerCase().includes(keyword.toLowerCase()) ||
          (item.MERK_TYPE?.toLowerCase().includes(keyword.toLowerCase())) ||
          (item.ASAL_USUL_PEROLEHAN?.toLowerCase().includes(keyword.toLowerCase()))
      );
      setData(filtered);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const isEdit = !!formData.ID;
    const url = isEdit
      ? `${API_URL}/master-aset-sekolah/${formData.ID}`
      : `${API_URL}/master-aset-sekolah`;

    try {
      if (isEdit) {
        await axios.put(url, formData);
        toastRef.current?.showToast("00", "Data berhasil diperbarui");
      } else {
        await axios.post(url, formData);
        toastRef.current?.showToast("00", "Data berhasil ditambahkan");
      }
      fetchAset();
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
      message: `Apakah Anda yakin ingin menghapus aset ${row.NAMA_BARANG}?`,
      header: "Konfirmasi Hapus",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Ya",
      rejectLabel: "Batal",
      accept: async () => {
        try {
          await axios.delete(`${API_URL}/master-aset-sekolah/${row.ID}`);
          fetchAset();
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
      ID: 0,
      NAMA_BARANG: "",
      MERK_TYPE: "",
      JUMLAH_BARANG: 1,
      ASAL_USUL_PEROLEHAN: "",
      PERIODE: "",
      KETERANGAN: "",
      STATUS: "Aktif",
    });
    setErrors({});
  };

  return (
    <div className="card">
      <ToastNotifier ref={toastRef} />
      <ConfirmDialog />

      <h3 className="text-xl font-semibold mb-3">Master Aset Sekolah</h3>

      <div className="flex items-center justify-end">
        <HeaderBar
          title=""
          placeholder="Cari Aset"
          onSearch={handleSearch}
          onAddClick={() => {
            resetForm();
            setDialogVisible(true);
          }}
        />
      </div>

      <TabelAset
        data={data}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormAset
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

export default AsetPage;
