"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dropdown } from "primereact/dropdown";
import ToastNotifier from "../../../components/ToastNotifier";
import CustomDataTable from "../../../components/DataTable";
import FormKelas from "./components/FormKelas";

export default function KelasPage() {
  const toastRef = useRef(null);
  const isMounted = useRef(true); // Tambahkan ref untuk tracking mounted

  const [kelas, setKelas] = useState([]);
  const [filteredKelas, setFilteredKelas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [dialogMode, setDialogMode] = useState(null);
  const [token, setToken] = useState("");
  const [tingkatanFilter, setTingkatanFilter] = useState(null);
  const [tingkatanOptions, setTingkatanOptions] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Ambil token
  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) window.location.href = "/";
    else setToken(t);
  }, []);

  // Fetch data kelas
  useEffect(() => {
    if (token) fetchKelas();
  }, [token]);

  // Cleanup ketika unmount untuk mencegah error toast
  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (toastRef.current) {
        toastRef.current = null;
      }
    };
  }, []);

  const fetchKelas = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/master-kelas`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      const data = json.data || [];

      if (!isMounted.current) return;

      setKelas(data);
      setFilteredKelas(data);

      const tingkatanSet = new Set(data.map((k) => k.TINGKATAN).filter(Boolean));
      setTingkatanOptions(Array.from(tingkatanSet).map((t) => ({ label: t, value: t })));
    } catch (err) {
      console.error(err);
      toastRef.current?.showToast("01", "Gagal memuat data kelas");
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!tingkatanFilter) setFilteredKelas(kelas);
    else setFilteredKelas(kelas.filter((k) => k.TINGKATAN === tingkatanFilter));
  }, [tingkatanFilter, kelas]);

  const handleSubmit = async (data) => {
    if (!dialogMode) return;

    try {
      if (dialogMode === "add") {
        await fetch(`${API_URL}/master-kelas`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        toastRef.current?.showToast("00", "Kelas berhasil ditambahkan");
      } else if (dialogMode === "edit" && selectedKelas) {
        await fetch(`${API_URL}/master-kelas/${selectedKelas.KELAS_ID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        toastRef.current?.showToast("00", "Kelas berhasil diperbarui");
      }

      if (isMounted.current) {
        await fetchKelas();
        setDialogMode(null);
        setSelectedKelas(null);
      }
    } catch (err) {
      console.error(err);
      toastRef.current?.showToast("01", "Gagal menyimpan kelas");
    }
  };

  const handleDelete = (rowData) => {
    confirmDialog({
      message: `Yakin ingin menghapus kelas "${rowData.NAMA_KELAS}"?`,
      header: "Konfirmasi Hapus",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Hapus",
      rejectLabel: "Batal",
      acceptClassName: "p-button-danger",
      accept: async () => {
        try {
          await fetch(`${API_URL}/master-kelas/${rowData.KELAS_ID}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          toastRef.current?.showToast("00", "Kelas berhasil dihapus");
          if (isMounted.current) setKelas((prev) => prev.filter((k) => k.KELAS_ID !== rowData.KELAS_ID));
        } catch (err) {
          console.error(err);
          toastRef.current?.showToast("01", "Gagal menghapus kelas");
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
          setSelectedKelas(rowData);
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

  const kelasColumns = [
    { field: "KELAS_ID", header: "ID", style: { width: "60px" } },
    { field: "NAMA_KELAS", header: "Nama Kelas", filter: true },
    { field: "TINGKATAN", header: "Tingkatan", filter: true },
    { field: "NAMA_JURUSAN", header: "Jurusan", filter: true },
    { field: "NAMA_GEDUNG", header: "Gedung", filter: true },
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
    {
      header: "Actions",
      body: actionBodyTemplate,
      style: { width: "120px" },
    },
  ];

  return (
    <div className="card p-4">
      <h3 className="text-xl font-semibold mb-4">Manage Kelas</h3>

      <div className="flex justify-content-end mb-3 gap-3">
        <Dropdown
          value={tingkatanFilter}
          options={tingkatanOptions}
          onChange={(e) => setTingkatanFilter(e.value)}
          placeholder="Tingkatan"
          className="w-60"
          showClear
        />
        <Button
          label="Tambah Kelas"
          icon="pi pi-plus"
          onClick={() => {
            setDialogMode("add");
            setSelectedKelas(null);
          }}
        />
      </div>

      <CustomDataTable data={filteredKelas} loading={isLoading} columns={kelasColumns} />

      <ConfirmDialog />

      <FormKelas
        visible={dialogMode !== null}
        onHide={() => {
          setDialogMode(null);
          setSelectedKelas(null);
        }}
        selectedKelas={selectedKelas}
        onSave={handleSubmit}
        token={token}
      />

      <ToastNotifier ref={toastRef} />
    </div>
  );
}
