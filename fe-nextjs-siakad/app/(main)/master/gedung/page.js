"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import ToastNotifier from "../../../components/ToastNotifier";
import CustomDataTable from "../../../components/DataTable";
import FormGedung from "./components/FormGedung";

export default function GedungPage() {
  const toastRef = useRef(null);
  const isMounted = useRef(true);

  const [gedung, setGedung] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGedung, setSelectedGedung] = useState(null);
  const [dialogMode, setDialogMode] = useState(null);
  const [token, setToken] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // 🔹 Ambil token dari localStorage
  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) window.location.href = "/";
    else setToken(t);
  }, []);

  // 🔹 Fetch data gedung kalau token tersedia
  useEffect(() => {
    if (token) fetchGedung();
  }, [token]);

  // 🔹 Cleanup saat unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
      toastRef.current = null;
    };
  }, []);

  // 🔹 Ambil semua data gedung
  const fetchGedung = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/master-gedung`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!isMounted.current) return;

      if (json.status === "success") {
        setGedung(json.data || []);
      } else {
        toastRef.current?.showToast("01", json.message || "Gagal memuat data gedung");
      }
    } catch (err) {
      console.error(err);
      toastRef.current?.showToast("01", "Gagal memuat data gedung");
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  };

  // 🔹 Tambah atau update gedung
  const handleSubmit = async (data) => {
    if (!dialogMode) return;

    // 🔸 Validasi frontend
    if (!data.NAMA_GEDUNG || data.NAMA_GEDUNG.trim().length < 3) {
      toastRef.current?.showToast("01", "Building name must be at least 3 characters.");
      return;
    }
    if (!data.LOKASI || data.LOKASI.trim().length < 3) {
      toastRef.current?.showToast("01", "Location must be at least 3 characters.");
      return;
    }

    try {
      let res;
      if (dialogMode === "add") {
        res = await fetch(`${API_URL}/master-gedung`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
      } else if (dialogMode === "edit" && selectedGedung) {
        res = await fetch(`${API_URL}/master-gedung/${selectedGedung.GEDUNG_ID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
      }

      const result = await res.json();

      if (result.status === "success") {
        toastRef.current?.showToast("00", result.message || "Gedung berhasil disimpan");
        await fetchGedung();
        setDialogMode(null);
        setSelectedGedung(null);
      } else {
        toastRef.current?.showToast("01", result.message || "Gagal menyimpan gedung");
      }
    } catch (err) {
      console.error(err);
      toastRef.current?.showToast("01", "Terjadi kesalahan saat menyimpan gedung");
    }
  };

  // 🔹 Hapus gedung
  const handleDelete = (rowData) => {
    confirmDialog({
      message: `Yakin ingin menghapus gedung "${rowData.NAMA_GEDUNG}"?`,
      header: "Konfirmasi Hapus",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Hapus",
      rejectLabel: "Batal",
      acceptClassName: "p-button-danger",
      accept: async () => {
        try {
          const res = await fetch(`${API_URL}/master-gedung/${rowData.GEDUNG_ID}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          const result = await res.json();

          if (result.status === "success") {
            toastRef.current?.showToast("00", "Gedung berhasil dihapus");
            if (isMounted.current) {
              setGedung((prev) => prev.filter((g) => g.GEDUNG_ID !== rowData.GEDUNG_ID));
            }
          } else {
            toastRef.current?.showToast("01", result.message || "Gagal menghapus gedung");
          }
        } catch (err) {
          console.error(err);
          toastRef.current?.showToast("01", "Terjadi kesalahan saat menghapus gedung");
        }
      },
    });
  };

  // 🔹 Template tombol edit & hapus
  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2 justify-center">
      <Button
        icon="pi pi-pencil"
        size="small"
        severity="warning"
        onClick={() => {
          setSelectedGedung(rowData);
          setDialogMode("edit");
        }}
      />
      <Button
        icon="pi pi-trash"
        size="small"
        severity="danger"
        onClick={() => handleDelete(rowData)}
      />
    </div>
  );

  // 🔹 Kolom tabel
  const gedungColumns = [
    { field: "GEDUNG_ID", header: "ID", style: { width: "60px" } },
    { field: "NAMA_GEDUNG", header: "Nama Gedung", filter: true },
    { field: "LOKASI", header: "Lokasi", filter: true },
    {
      header: "Actions",
      body: actionBodyTemplate,
      style: { width: "120px" },
    },
  ];

  // 🔹 Filter hasil pencarian
  const filteredGedung = gedung.filter(
    (g) =>
      g.NAMA_GEDUNG.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.LOKASI.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card p-4">
      <h3 className="text-xl font-semibold mb-4 text-green-700">
        🏢 Manajemen Gedung
      </h3>

      {/* 🔍 Search + Tambah di pojok kanan */}
      <div className="flex justify-start items-center gap-2 mb-3">

        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama gedung atau lokasi..."
            className="p-inputtext p-component w-72"
          />
        </span>

        {searchTerm && (
          <Button
            icon="pi pi-times"
            severity="secondary"
            size="small"
            rounded
            text
            onClick={() => setSearchTerm("")}
            tooltip="Hapus pencarian"
          />
        )}

        <Button
          label="Tambah Gedung"
          icon="pi pi-plus"
          severity="info"
          onClick={() => {
            setDialogMode("add");
            setSelectedGedung(null);
          }}
        />
      </div>

      <CustomDataTable
        data={filteredGedung}
        loading={isLoading}
        columns={gedungColumns}
        emptyMessage="Belum ada data gedung"
      />

      <ConfirmDialog />

      <FormGedung
        visible={dialogMode !== null}
        onHide={() => {
          setDialogMode(null);
          setSelectedGedung(null);
        }}
        selectedGedung={selectedGedung}
        onSave={handleSubmit}
      />

      <ToastNotifier ref={toastRef} />
    </div>
  );
}
