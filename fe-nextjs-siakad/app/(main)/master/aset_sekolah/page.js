"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dropdown } from "primereact/dropdown";
import ToastNotifier from "../../../components/ToastNotifier";
import CustomDataTable from "../../../components/DataTable";
import FormAset from "./components/formDialogAset";

export default function AsetPage() {
  const toastRef = useRef(null);
  const isMounted = useRef(true);

  const [aset, setAset] = useState([]);
  const [filteredAset, setFilteredAset] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAset, setSelectedAset] = useState(null);
  const [dialogMode, setDialogMode] = useState(null);
  const [token, setToken] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);

  const statusOptions = [
    { label: "Aktif", value: "Aktif" },
    { label: "Tidak Aktif", value: "Tidak Aktif" },
  ];

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Ambil token login
  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) window.location.href = "/";
    else setToken(t);

    return () => {
      isMounted.current = false;
      toastRef.current = null;
    };
  }, []);

  // Fetch data aset
  useEffect(() => {
    if (token) fetchAset();
  }, [token]);

  const fetchAset = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/master-aset-sekolah`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!isMounted.current) return;

      const data = json.data || [];
      setAset(data);
      setFilteredAset(data);
    } catch (err) {
      console.error(err);
      toastRef.current?.showToast("01", "Gagal memuat data aset");
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  };

  // Filter berdasarkan status
  useEffect(() => {
    if (!statusFilter) {
      setFilteredAset(aset);
    } else {
      setFilteredAset(aset.filter((a) => a.STATUS === statusFilter));
    }
  }, [statusFilter, aset]);

  // Simpan (Tambah/Edit)
  const handleSubmit = async (data) => {
    if (!dialogMode) return;

    try {
      if (dialogMode === "add") {
        await fetch(`${API_URL}/master-aset-sekolah`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(data),
        });
        toastRef.current?.showToast("00", "Aset berhasil ditambahkan");
      } else if (dialogMode === "edit" && selectedAset) {
        await fetch(`${API_URL}/master-aset-sekolah/${selectedAset.ASET_ID}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(data),
        });
        toastRef.current?.showToast("00", "Aset berhasil diperbarui");
      }

      if (isMounted.current) {
        await fetchAset();
        setDialogMode(null);
        setSelectedAset(null);
      }
    } catch (err) {
      console.error(err);
      toastRef.current?.showToast("01", "Gagal menyimpan aset");
    }
  };

  // Hapus aset
  const handleDelete = (rowData) => {
    confirmDialog({
      message: `Yakin ingin menghapus aset "${rowData.NAMA_ASET}"?`,
      header: "Konfirmasi Hapus",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Hapus",
      rejectLabel: "Batal",
      acceptClassName: "p-button-danger",
      accept: async () => {
        try {
          await fetch(`${API_URL}/master-aset-sekolah/${rowData.ASET_ID}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          toastRef.current?.showToast("00", "Aset berhasil dihapus");
          if (isMounted.current) await fetchAset();
        } catch (err) {
          console.error(err);
          toastRef.current?.showToast("01", "Gagal menghapus aset");
        }
      },
    });
  };

  // Tombol edit + hapus
  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" size="small" severity="warning" onClick={() => { setSelectedAset(rowData); setDialogMode("edit"); }} />
      <Button icon="pi pi-trash" size="small" severity="danger" onClick={() => handleDelete(rowData)} />
    </div>
  );

  // Kolom tabel aset
const asetColumns = [
   { field: "ASET_ID", header: "ID" },
  { field: "KODE_ASET", header: "Kode Aset" },
  { field: "NAMA_ASET", header: "Nama Aset" },
  { field: "JENIS_ASET", header: "Jenis" },
  { field: "JUMLAH", header: "Jumlah" },
  { field: "KONDISI", header: "Kondisi" },
  { field: "SUMBER_DANA", header: "Sumber Dana" },
  {
    field: "TANGGAL_PEMBELIAN",
    header: "Tanggal Pembelian",
    body: (row) =>
      row.TANGGAL_PEMBELIAN
        ? new Date(row.TANGGAL_PEMBELIAN).toLocaleDateString("id-ID")
        : "-",
  },
  {
    field: "HARGA_SATUAN",
    header: "Harga Satuan",
    body: (row) => row.HARGA_SATUAN?.toLocaleString("id-ID"),
  },
  {
    field: "TOTAL_HARGA",
    header: "Total Harga",
    body: (row) => row.TOTAL_HARGA?.toLocaleString("id-ID"),
  },
  {
    field: "KETERANGAN",
    header: "Keterangan",
    body: (row) => row.KETERANGAN || "-",
  },
 {
    field: "GEDUNG_ID",
    header: "Gedung",
    body: (row) => row.gedung?.NAMA_GEDUNG || "-", // kalau ada relasi
  },
 {
    field: "STATUS",
    header: "Status",
    body: (row) => row.STATUS || "-",
  },
 
  { header: "Actions", body: actionBodyTemplate, style: { width: "120px" } },
];


  return (
    <div className="card p-4">
      <h3 className="text-xl font-semibold mb-4">Master Aset Sekolah</h3>

      <div className="flex justify-content-end mb-3 gap-3">

        <Button
          label="Tambah Aset"
          icon="pi pi-plus"
          onClick={() => { setDialogMode("add"); setSelectedAset(null); }}
        />
      </div>

      <CustomDataTable data={filteredAset} loading={isLoading} columns={asetColumns} />

      <ConfirmDialog />

      <FormAset
        visible={dialogMode !== null}
        onHide={() => { setDialogMode(null); setSelectedAset(null); }}
        selectedAset={selectedAset}
        onSave={handleSubmit}
        token={token}
      />

      <ToastNotifier ref={toastRef} />
    </div>
  );
}
