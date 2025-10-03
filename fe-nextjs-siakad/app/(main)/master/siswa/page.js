"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import HeaderBar from "../../../components/headerbar";
import ToastNotifier from "../../../components/ToastNotifier";
import TabelSiswa from "./components/tabelSiswa";
import FormSiswa from "./components/formDialogSiswa";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const SiswaPage = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const [formData, setFormData] = useState({
    SISWA_ID: 0,
    nis: "",
    nisn: "",
    nama: "",
    gender: "",
    tgl_lahir: "",
    email: "",
    password: "",
    status: "Aktif",
  });

  const [errors, setErrors] = useState({});
  const toastRef = useRef(null);

  useEffect(() => {
    fetchSiswa();
  }, []);

  const fetchSiswa = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/siswa`);
      if (res.data.status === "00") {
        setData(res.data.data);
        setOriginalData(res.data.data);
      }
    } catch (err) {
      toastRef.current?.showToast("01", "Gagal ambil data siswa");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nis?.trim()) newErrors.nis = "NIS wajib diisi";
    if (!formData.nama?.trim()) newErrors.nama = "Nama wajib diisi";
    if (!formData.email?.trim()) newErrors.email = "Email wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const isEdit = !!formData.SISWA_ID;
    const url = isEdit
      ? `${API_URL}/siswa/${formData.SISWA_ID}`
      : `${API_URL}/auth/register-siswa`;

    try {
      if (isEdit) {
        await axios.put(url, formData);
        toastRef.current?.showToast("00", "Data siswa diperbarui");
      } else {
        await axios.post(url, formData);
        toastRef.current?.showToast("00", "Siswa berhasil ditambahkan");
      }
      fetchSiswa();
      setDialogVisible(false);
      resetForm();
    } catch (err) {
      toastRef.current?.showToast("01", "Gagal simpan data siswa");
    }
  };

  const handleEdit = (row) => {
    setFormData({ ...row });
    setDialogVisible(true);
  };

  const handleDelete = (row) => {
    confirmDialog({
      message: `Yakin hapus siswa ${row.NAMA}?`,
      header: "Konfirmasi Hapus",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Ya",
      rejectLabel: "Batal",
      accept: async () => {
        try {
          await axios.delete(`${API_URL}/siswa/${row.SISWA_ID}`);
          fetchSiswa();
          toastRef.current?.showToast("00", "Data siswa dihapus");
        } catch (err) {
          toastRef.current?.showToast("01", "Gagal hapus data siswa");
        }
      },
    });
  };

  const resetForm = () => {
    setFormData({
      SISWA_ID: 0,
      nis: "",
      nisn: "",
      nama: "",
      gender: "",
      tgl_lahir: "",
      email: "",
      password: "",
      status: "Aktif",
    });
    setErrors({});
  };

  return (
    <div className="card">
      <ToastNotifier ref={toastRef} />
      <ConfirmDialog />

      <h3 className="text-xl font-semibold mb-3">Master Siswa</h3>

      <div className="flex items-center justify-end">
        <HeaderBar
          title=""
          placeholder="Cari Siswa"
          onSearch={(keyword) => {
            if (!keyword) {
              setData(originalData);
            } else {
              setData(originalData.filter((item) =>
                item.NAMA.toLowerCase().includes(keyword.toLowerCase())
              ));
            }
          }}
          onAddClick={() => {
            resetForm();
            setDialogVisible(true);
          }}
        />
      </div>

      <TabelSiswa
        data={data}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormSiswa
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

export default SiswaPage;
