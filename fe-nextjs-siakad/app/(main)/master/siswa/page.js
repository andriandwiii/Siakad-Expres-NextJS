"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import HeaderBar from "../../../components/headerbar";
import ToastNotifier from "../../../components/ToastNotifier";
import TabelSiswa from "./components/tabelSiswa";
import FormSiswa from "./components/SiswaDetailDialog";

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
    tempat_lahir: "",
    tgl_lahir: "",
    email: "",
    password: "",
    status: "Aktif",
    alamat: "",
    agama: "",
    no_telp: "",
    kelas: "",
    jurusan: "",
    tahun_masuk: "",
    gol_darah: "",
    tinggi: "",
    berat: "",
    kebutuhan_khusus: "",
    foto: "",
    orang_tua: [
      { jenis: "Ayah", nama: "", pekerjaan: "", pendidikan: "", alamat: "", no_hp: "" },
      { jenis: "Ibu", nama: "", pekerjaan: "", pendidikan: "", alamat: "", no_hp: "" },
    ],
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
    // Validasi orang tua
    formData.orang_tua.forEach((ortu, i) => {
      if (!ortu.nama?.trim()) newErrors[`ortu_${i}_nama`] = `${ortu.jenis} wajib diisi`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const isEdit = !!formData.SISWA_ID;

    try {
      if (isEdit) {
        const res = await axios.put(`${API_URL}/siswa/${formData.SISWA_ID}`, formData);
        toastRef.current?.showToast("00", "Data siswa diperbarui");
        setData((prev) =>
          prev.map((item) => (item.SISWA_ID === formData.SISWA_ID ? res.data.data : item))
        );
        setOriginalData((prev) =>
          prev.map((item) => (item.SISWA_ID === formData.SISWA_ID ? res.data.data : item))
        );
      } else {
        const res = await axios.post(`${API_URL}/auth/register-siswa`, formData);
        toastRef.current?.showToast("00", "Siswa berhasil ditambahkan");
        setData((prev) => [...prev, res.data]);
        setOriginalData((prev) => [...prev, res.data]);
      }

      setDialogVisible(false);
      resetForm();
    } catch (err) {
      toastRef.current?.showToast("01", "Gagal simpan data siswa");
    }
  };

  const handleEdit = (row) => {
    // Jika ortu null, isi default
    const ortuDefault = [
      { jenis: "Ayah", nama: "", pekerjaan: "", pendidikan: "", alamat: "", no_hp: "" },
      { jenis: "Ibu", nama: "", pekerjaan: "", pendidikan: "", alamat: "", no_hp: "" },
    ];
    setFormData({ ...row, orang_tua: row.orang_tua || ortuDefault });
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
          toastRef.current?.showToast("00", "Data siswa dihapus");
          setData((prev) => prev.filter((item) => item.SISWA_ID !== row.SISWA_ID));
          setOriginalData((prev) => prev.filter((item) => item.SISWA_ID !== row.SISWA_ID));
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
      tempat_lahir: "",
      tgl_lahir: "",
      email: "",
      password: "",
      status: "Aktif",
      alamat: "",
      agama: "",
      no_telp: "",
      kelas: "",
      jurusan: "",
      tahun_masuk: "",
      gol_darah: "",
      tinggi: "",
      berat: "",
      kebutuhan_khusus: "",
      foto: "",
      orang_tua: [
        { jenis: "Ayah", nama: "", pekerjaan: "", pendidikan: "", alamat: "", no_hp: "" },
        { jenis: "Ibu", nama: "", pekerjaan: "", pendidikan: "", alamat: "", no_hp: "" },
      ],
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
              setData(
                originalData.filter((item) =>
                  item.NAMA.toLowerCase().includes(keyword.toLowerCase())
                )
              );
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
        reloadData={fetchSiswa}
      />
    </div>
  );
};

export default SiswaPage;
