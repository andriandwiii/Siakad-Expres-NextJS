"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import ToastNotifier from "../../../components/ToastNotifier";
import CustomDataTable from "../../../components/DataTable";
import FormGedung from "./components/FormGedung";

export default function GedungPage() {
  const toastRef = useRef(null);
  const isMounted = useRef(true); // track mounted state

  const [gedung, setGedung] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGedung, setSelectedGedung] = useState(null);
  const [dialogMode, setDialogMode] = useState(null); 
  const [token, setToken] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) window.location.href = "/";
    else setToken(t);
  }, []);

  useEffect(() => {
    if (token) fetchGedung();
  }, [token]);

  // Cleanup saat unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
      toastRef.current = null;
    };
  }, []);

  const fetchGedung = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/master-gedung`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!isMounted.current) return;
      setGedung(json.data || []);
    } catch (err) {
      console.error(err);
      toastRef.current?.showToast("01", "Gagal memuat data gedung");
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    if (!dialogMode) return;

    try {
      if (dialogMode === "add") {
        await fetch(`${API_URL}/master-gedung`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        toastRef.current?.showToast("00", "Gedung berhasil ditambahkan");
      } else if (dialogMode === "edit" && selectedGedung) {
        await fetch(`${API_URL}/master-gedung/${selectedGedung.GEDUNG_ID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        toastRef.current?.showToast("00", "Gedung berhasil diperbarui");
      }

      if (isMounted.current) {
        await fetchGedung();
        setDialogMode(null);
        setSelectedGedung(null);
      }
    } catch (err) {
      console.error(err);
      toastRef.current?.showToast("01", "Gagal menyimpan gedung");
    }
  };

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
          await fetch(`${API_URL}/master-gedung/${rowData.GEDUNG_ID}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          toastRef.current?.showToast("00", "Gedung berhasil dihapus");
          if (isMounted.current) {
            setGedung((prev) =>
              prev.filter((g) => g.GEDUNG_ID !== rowData.GEDUNG_ID)
            );
          }
        } catch (err) {
          console.error(err);
          toastRef.current?.showToast("01", "Gagal menghapus gedung");
        }
      },
    });
  };

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
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

  return (
    <div className="card p-4">
      <h3 className="text-xl font-semibold mb-4">Manage Gedung</h3>

      <div className="flex justify-content-end mb-3">
        <Button
          label="Tambah Gedung"
          icon="pi pi-plus"
          onClick={() => {
            setDialogMode("add");
            setSelectedGedung(null);
          }}
        />
      </div>

      <CustomDataTable data={gedung} loading={isLoading} columns={gedungColumns} />

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
