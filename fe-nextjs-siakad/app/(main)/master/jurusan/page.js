"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import ToastNotifier from "../../../components/ToastNotifier";
import CustomDataTable from "../../../components/DataTable";
import FormJurusan from "./components/FormJurusan";

export default function JurusanPage() {
  const toastRef = useRef(null);
  const isMounted = useRef(true);

  const [jurusan, setJurusan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedJurusan, setSelectedJurusan] = useState(null);
  const [dialogMode, setDialogMode] = useState(null);
  const [token, setToken] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) window.location.href = "/";
    else setToken(t);
  }, []);

  useEffect(() => {
    if (token) fetchJurusan();
  }, [token]);

  // Cleanup saat unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
      toastRef.current = null;
    };
  }, []);

  const fetchJurusan = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/master-jurusan`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!isMounted.current) return;
      setJurusan(json.data || []);
    } catch (err) {
      console.error(err);
      toastRef.current?.showToast("01", "Gagal memuat data jurusan");
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    if (!dialogMode) return;

    try {
      if (dialogMode === "add") {
        await fetch(`${API_URL}/master-jurusan`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        toastRef.current?.showToast("00", "Jurusan berhasil ditambahkan");
      } else if (dialogMode === "edit" && selectedJurusan) {
        await fetch(`${API_URL}/master-jurusan/${selectedJurusan.JURUSAN_ID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        toastRef.current?.showToast("00", "Jurusan berhasil diperbarui");
      }

      if (isMounted.current) {
        await fetchJurusan();
        setDialogMode(null);
        setSelectedJurusan(null);
      }
    } catch (err) {
      console.error(err);
      toastRef.current?.showToast("01", "Gagal menyimpan jurusan");
    }
  };

  const handleDelete = (rowData) => {
    confirmDialog({
      message: `Yakin ingin menghapus jurusan "${rowData.NAMA_JURUSAN}"?`,
      header: "Konfirmasi Hapus",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Hapus",
      rejectLabel: "Batal",
      acceptClassName: "p-button-danger",
      accept: async () => {
        try {
          await fetch(`${API_URL}/master-jurusan/${rowData.JURUSAN_ID}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          toastRef.current?.showToast("00", "Jurusan berhasil dihapus");
          if (isMounted.current) {
            setJurusan((prev) =>
              prev.filter((j) => j.JURUSAN_ID !== rowData.JURUSAN_ID)
            );
          }
        } catch (err) {
          console.error(err);
          toastRef.current?.showToast("01", "Gagal menghapus jurusan");
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
          setSelectedJurusan(rowData);
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

  const jurusanColumns = [
    { field: "JURUSAN_ID", header: "ID", style: { width: "60px" } },
    { field: "NAMA_JURUSAN", header: "Nama Jurusan", filter: true },
    { field: "DESKRIPSI", header: "Deskripsi", filter: true },
   
    {
      header: "Actions",
      body: actionBodyTemplate,
      style: { width: "120px" },
    },
  ];

  return (
    <div className="card p-4">
      <h3 className="text-xl font-semibold mb-4">Manage Jurusan</h3>

      <div className="flex justify-content-end mb-3">
        <Button
          label="Tambah Jurusan"
          icon="pi pi-plus"
          onClick={() => {
            setDialogMode("add");
            setSelectedJurusan(null);
          }}
        />
      </div>

      <CustomDataTable
        data={jurusan}
        loading={isLoading}
        columns={jurusanColumns}
      />

      <ConfirmDialog />

      <FormJurusan
        visible={dialogMode !== null}
        onHide={() => {
          setDialogMode(null);
          setSelectedJurusan(null);
        }}
        selectedJurusan={selectedJurusan}
        onSave={handleSubmit}
      />

      <ToastNotifier ref={toastRef} />
    </div>
  );
}
