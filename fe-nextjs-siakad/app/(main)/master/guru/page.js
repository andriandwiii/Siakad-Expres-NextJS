"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import TabelGuru from "./components/tabelGuru";
import FormGuru from "./components/formDialogGuru";
import HeaderBar from "@/app/components/headerbar";
import ToastNotifier from "@/app/components/ToastNotifier";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const GuruPage = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [formData, setFormData] = useState({
    GURU_ID: 0,
    user_id: "",
    NIP: "",
    NAMA: "",
    GELAR_DEPAN: "",
    GELAR_BELAKANG: "",
    PANGKAT: "",
    JABATAN: "",
    STATUS_KEPEGAWAIAN: "",
    EMAIL: "",
    TGL_LAHIR: "",
    TEMPAT_LAHIR: "",
    GENDER: "",
    ALAMAT: "",
    NO_TELP: "",
  });
  const [errors, setErrors] = useState({});
  const toastRef = useRef(null);

  useEffect(() => {
    fetchGuru();
  }, []);

  const fetchGuru = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/master-guru`);
      if (res.data.status === "00") {
        setData(Array.isArray(res.data.data) ? res.data.data : [res.data.data]);
        setOriginalData(Array.isArray(res.data.data) ? res.data.data : [res.data.data]);
      } else {
        toastRef.current?.showToast("01", res.data.message || "Gagal mengambil data");
      }
    } catch (err) {
      console.error("Gagal mengambil data:", err);
      toastRef.current?.showToast("01", "Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.NIP?.trim()) newErrors.NIP = "NIP wajib diisi";
    if (!formData.NAMA?.trim()) newErrors.NAMA = "Nama wajib diisi";
    if (!formData.PANGKAT?.trim()) newErrors.PANGKAT = "Pangkat wajib diisi";
    if (!formData.JABATAN?.trim()) newErrors.JABATAN = "Jabatan wajib diisi";
    if (!formData.STATUS_KEPEGAWAIAN?.trim()) newErrors.STATUS_KEPEGAWAIAN = "Status wajib diisi";
    if (!formData.EMAIL?.trim()) newErrors.EMAIL = "Email wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = (keyword) => {
    if (!keyword) {
      setData(originalData);
    } else {
      const filtered = originalData.filter(
        (item) =>
          item.NIP?.toLowerCase().includes(keyword.toLowerCase()) ||
          item.NAMA?.toLowerCase().includes(keyword.toLowerCase())
      );
      setData(filtered);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    const isEdit = !!formData.GURU_ID;
    const url = isEdit
      ? `${API_URL}/master-guru/${formData.GURU_ID}`
      : `${API_URL}/master-guru`;
    try {
      if (isEdit) {
        await axios.put(url, formData);
        toastRef.current?.showToast("00", "Data berhasil diperbarui");
      } else {
        await axios.post(url, formData);
        toastRef.current?.showToast("00", "Data berhasil ditambahkan");
      }
      fetchGuru();
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
      message: `Apakah Anda yakin ingin menghapus guru ${row.NAMA}?`,
      header: "Konfirmasi Hapus",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Ya",
      rejectLabel: "Batal",
      accept: async () => {
        try {
          await axios.delete(`${API_URL}/master-guru/${row.GURU_ID}`);
          fetchGuru();
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
      GURU_ID: 0,
      user_id: "",
      NIP: "",
      NAMA: "",
      GELAR_DEPAN: "",
      GELAR_BELAKANG: "",
      PANGKAT: "",
      JABATAN: "",
      STATUS_KEPEGAWAIAN: "",
      EMAIL: "",
      TGL_LAHIR: "",
      TEMPAT_LAHIR: "",
      GENDER: "",
      ALAMAT: "",
      NO_TELP: "",
    });
    setErrors({});
  };

  return (
    <div className="card">
      <ToastNotifier ref={toastRef} />
      <ConfirmDialog />
      <h3 className="text-xl font-semibold mb-3">Master Guru</h3>
      <div className="flex items-center justify-end">
        <HeaderBar
          title=""
          placeholder="Cari Guru"
          onSearch={handleSearch}
          onAddClick={() => {
            resetForm();
            setDialogVisible(true);
          }}
        />
      </div>
      <TabelGuru
        data={data}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <FormGuru
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

export default GuruPage;