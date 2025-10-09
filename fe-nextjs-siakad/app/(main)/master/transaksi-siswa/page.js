"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dropdown } from "primereact/dropdown";
import ToastNotifier from "../../../components/ToastNotifier";
import CustomDataTable from "../../../components/DataTable";
import FormTransaksi from "./components/FormTransaksi";

export default function TransaksiPage() {
  const toastRef = useRef(null);
  const isMounted = useRef(true);

  const [transaksi, setTransaksi] = useState([]);
  const [filteredTransaksi, setFilteredTransaksi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTransaksi, setSelectedTransaksi] = useState(null);
  const [dialogMode, setDialogMode] = useState(null);
  const [token, setToken] = useState("");
  const [kelasFilter, setKelasFilter] = useState(null);
  const [kelasOptions, setKelasOptions] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) window.location.href = "/";
    else setToken(t);

    return () => {
      isMounted.current = false; // cleanup
      toastRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (token) fetchTransaksi();
  }, [token]);

  const fetchTransaksi = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/transaksi-siswa`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!isMounted.current) return;

      const data = json.data || [];
      setTransaksi(data);
      setFilteredTransaksi(data);

      const kelasSet = new Set();
      data.forEach((t) => {
        if (t.kelas) {
          const kelasFull = `${t.kelas.TINGKATAN || ""} ${t.kelas.NAMA_JURUSAN || ""} ${t.kelas.NAMA_KELAS || ""}`.trim();
          kelasSet.add(kelasFull);
        }
      });
      setKelasOptions(Array.from(kelasSet).map((k) => ({ label: k, value: k })));
    } catch (err) {
      console.error(err);
      toastRef.current?.showToast("01", "Gagal memuat data transaksi");
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!kelasFilter) {
      setFilteredTransaksi(transaksi);
    } else {
      setFilteredTransaksi(
        transaksi.filter((t) => {
          if (!t.kelas) return false;
          const kelasFull = `${t.kelas.TINGKATAN || ""} ${t.kelas.NAMA_JURUSAN || ""} ${t.kelas.NAMA_KELAS || ""}`.trim();
          return kelasFull === kelasFilter;
        })
      );
    }
  }, [kelasFilter, transaksi]);

  const handleSubmit = async (data) => {
    if (!dialogMode) return;

    try {
      if (dialogMode === "add") {
        await fetch(`${API_URL}/transaksi-siswa`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(data),
        });
        toastRef.current?.showToast("00", "Transaksi berhasil ditambahkan");
      } else if (dialogMode === "edit" && selectedTransaksi) {
        await fetch(`${API_URL}/transaksi-siswa/${selectedTransaksi.ID}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(data),
        });
        toastRef.current?.showToast("00", "Transaksi berhasil diperbarui");
      }

      if (isMounted.current) {
        await fetchTransaksi();
        setDialogMode(null);
        setSelectedTransaksi(null);
      }
    } catch (err) {
      console.error(err);
      toastRef.current?.showToast("01", "Gagal menyimpan transaksi");
    }
  };

  const handleDelete = (rowData) => {
    confirmDialog({
      message: `Yakin ingin menghapus transaksi siswa "${rowData.siswa?.NAMA}"?`,
      header: "Konfirmasi Hapus",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Hapus",
      rejectLabel: "Batal",
      acceptClassName: "p-button-danger",
      accept: async () => {
        try {
          await fetch(`${API_URL}/transaksi-siswa/${rowData.ID}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          toastRef.current?.showToast("00", "Transaksi berhasil dihapus");
          if (isMounted.current) await fetchTransaksi();
        } catch (err) {
          console.error(err);
          toastRef.current?.showToast("01", "Gagal menghapus transaksi");
        }
      },
    });
  };

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" size="small" severity="warning" onClick={() => { setSelectedTransaksi(rowData); setDialogMode("edit"); }} />
      <Button icon="pi pi-trash" size="small" severity="danger" onClick={() => handleDelete(rowData)} />
    </div>
  );

  const transaksiColumns = [
    { field: "ID", header: "ID", style: { width: "60px" } },
    {
      field: "siswa.NAMA",
      header: "Siswa",
      style: { minWidth: "150px" },
      body: (row) => row.siswa?.NAMA || "-",
    },
    {
      field: "kelas.NAMA_KELAS",
      header: "Kelas",
      style: { minWidth: "180px" },
      body: (row) => {
        if (!row.kelas) return "-";
        return `${row.kelas.TINGKATAN || ""} ${row.kelas.NAMA_JURUSAN || ""} ${row.kelas.NAMA_KELAS || ""}`.trim();
      },
    },
    { field: "TAHUN_AJARAN", header: "Tahun Ajaran" },
    { field: "STATUS", header: "Status" },
    {
      field: "created_at",
      header: "Created At",
      body: (row) => (row.created_at ? new Date(row.created_at).toLocaleString() : "-"),
    },
    {
      field: "updated_at",
      header: "Updated At",
      body: (row) => (row.updated_at ? new Date(row.updated_at).toLocaleString() : "-"),
    },
    { header: "Actions", body: actionBodyTemplate, style: { width: "120px" } },
  ];

  return (
    <div className="card p-4">
      <h3 className="text-xl font-semibold mb-4">Penempatan Siswa ke Kelas</h3>

      <div className="flex justify-content-end mb-3 gap-3">
        <Dropdown
          value={kelasFilter}
          options={kelasOptions}
          onChange={(e) => setKelasFilter(e.value)}
          placeholder="Filter by kelas"
          className="w-60"
          showClear
        />

        <Button
          label="Tambah Transaksi"
          icon="pi pi-plus"
          onClick={() => { setDialogMode("add"); setSelectedTransaksi(null); }}
        />
      </div>

      <CustomDataTable data={filteredTransaksi} loading={isLoading} columns={transaksiColumns} />

      <ConfirmDialog />

      <FormTransaksi
        visible={dialogMode !== null}
        onHide={() => { setDialogMode(null); setSelectedTransaksi(null); }}
        selectedTransaksi={selectedTransaksi}
        onSave={handleSubmit}
        token={token}
        transaksiList={transaksi}
      />

      <ToastNotifier ref={toastRef} />
    </div>
  );
}
