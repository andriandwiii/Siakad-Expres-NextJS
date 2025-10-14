"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import ToastNotifier from "../../../components/ToastNotifier";
import CustomDataTable from "../../../components/DataTable";
import FormRuang from "./components/formruang";

export default function RuangPage() {
  const toastRef = useRef(null);
  const isMounted = useRef(true);

  const [ruang, setRuang] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRuang, setSelectedRuang] = useState(null);
  const [dialogMode, setDialogMode] = useState(null);
  const [token, setToken] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) window.location.href = "/";
    else setToken(t);
  }, []);

  useEffect(() => {
    if (token) fetchRuang();
  }, [token]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
      toastRef.current = null;
    };
  }, []);

  const fetchRuang = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/master-ruang`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!isMounted.current) return;
      setRuang(json.data || []);
    } catch (err) {
      console.error(err);
      toastRef.current?.showToast("01", "Gagal memuat data ruang kelas");
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    if (!dialogMode) return;

    try {
      if (dialogMode === "add") {
        await fetch(`${API_URL}/master-ruang`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        toastRef.current?.showToast("00", "Ruang berhasil ditambahkan");
      } else if (dialogMode === "edit" && selectedRuang) {
        await fetch(`${API_URL}/master-ruang/${selectedRuang.RUANG_ID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        toastRef.current?.showToast("00", "Ruang berhasil diperbarui");
      }

      if (isMounted.current) {
        await fetchRuang();
        setDialogMode(null);
        setSelectedRuang(null);
      }
    } catch (err) {
      console.error(err);
      toastRef.current?.showToast("01", "Gagal menyimpan ruang kelas");
    }
  };

  const handleDelete = (rowData) => {
    confirmDialog({
      message: `Yakin ingin menghapus ruang "${rowData.NAMA_RUANG}"?`,
      header: "Konfirmasi Hapus",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Hapus",
      rejectLabel: "Batal",
      acceptClassName: "p-button-danger",
      accept: async () => {
        try {
          await fetch(`${API_URL}/master-ruang/${rowData.RUANG_ID}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          toastRef.current?.showToast("00", "Ruang berhasil dihapus");
          if (isMounted.current) {
            setRuang((prev) => prev.filter((r) => r.RUANG_ID !== rowData.RUANG_ID));
          }
        } catch (err) {
          console.error(err);
          toastRef.current?.showToast("01", "Gagal menghapus ruang kelas");
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
          setSelectedRuang(rowData);
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

  const ruangColumns = [
    { field: "RUANG_ID", header: "ID", style: { width: "60px" } },
    { field: "NAMA_RUANG", header: "Nama Ruang", filter: true },
    { field: "DESKRIPSI", header: "Deskripsi", filter: true },
    {
      header: "Actions",
      body: actionBodyTemplate,
      style: { width: "120px" },
    },
  ];

  return (
    <div className="card p-4">  
      <h3 className="text-xl font-semibold mb-4">Master Ruang Kelas</h3>

      <div className="flex justify-content-end mb-3">
        <Button
          label="Tambah Ruang"
          icon="pi pi-plus"
          onClick={() => {
            setDialogMode("add");
            setSelectedRuang(null);
          }}
        />
      </div>

      <CustomDataTable
        data={ruang}
        loading={isLoading}
        columns={ruangColumns}
      />

      <ConfirmDialog />

      <FormRuang
        visible={dialogMode !== null}
        onHide={() => {
          setDialogMode(null);
          setSelectedRuang(null);
        }}
        selectedRuang={selectedRuang}
        onSave={handleSubmit}
      />

      <ToastNotifier ref={toastRef} />
    </div>
  );
}
