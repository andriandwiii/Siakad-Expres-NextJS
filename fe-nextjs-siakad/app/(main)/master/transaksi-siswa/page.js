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
      isMounted.current = false;
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

      // Ambil fullName dari backend
      const kelasSet = new Set();
      const processedData = data.map((t) => {
        const kelasLabel = t.kelas?.fullName || "-";
        if (kelasLabel !== "-") kelasSet.add(kelasLabel);
        return { ...t, kelasLabel };
      });

      setTransaksi(processedData);
      setFilteredTransaksi(processedData);

      // Dropdown filter kelas
      setKelasOptions(Array.from(kelasSet).map((k) => ({ label: k, value: k })));
    } catch (err) {
      console.error(err);
      toastRef.current?.showToast("01", "Gagal memuat data transaksi");
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!kelasFilter) setFilteredTransaksi(transaksi);
    else setFilteredTransaksi(transaksi.filter((t) => t.kelasLabel === kelasFilter));
  }, [kelasFilter, transaksi]);

  const handleSubmit = async (data) => {
    if (!dialogMode) return;

    try {
      if (dialogMode === "add") {
        await fetch(`${API_URL}/transaksi-siswa`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        toastRef.current?.showToast("00", "Transaksi berhasil ditambahkan");
      } else if (dialogMode === "edit" && selectedTransaksi) {
        await fetch(`${API_URL}/transaksi-siswa/${selectedTransaksi.ID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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

  const transaksiColumns = [
    { field: "ID", header: "ID", style: { width: "60px" } },
    {
      field: "siswa.NAMA",
      header: "Nama Siswa",
      style: { minWidth: "160px" },
      body: (row) => row.siswa?.NAMA || "-",
    },
    {
      field: "siswa.NIS",
      header: "NIS",
      style: { minWidth: "120px" },
      body: (row) => row.siswa?.NIS || "-",
    },
    {
      field: "kelasLabel",
      header: "Kelas",
      style: { minWidth: "180px" },
      body: (row) => row.kelasLabel || "-",
    },
    {
      field: "TAHUN_AJARAN",
      header: "Tahun Ajaran",
      style: { minWidth: "140px" },
    },
    {
      field: "STATUS",
      header: "Status",
      style: { minWidth: "100px" },
    },
    {
      header: "Aksi",
      body: (rowData) => (
        <div className="flex gap-2">
          <Button
            icon="pi pi-pencil"
            size="small"
            severity="warning"
            onClick={() => {
              setSelectedTransaksi(rowData);
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
      ),
      style: { width: "120px" },
    },
  ];

  return (
    <div className="card p-4">
      <h3 className="text-xl font-semibold mb-4">Penempatan Siswa ke Kelas</h3>

      <div className="flex justify-content-end mb-3 gap-3">
        <Dropdown
          value={kelasFilter}
          options={kelasOptions}
          onChange={(e) => setKelasFilter(e.value)}
          placeholder="Filter berdasarkan kelas"
          className="w-60"
          showClear
        />
        <Button
          label="Tambah Transaksi"
          icon="pi pi-plus"
          onClick={() => {
            setDialogMode("add");
            setSelectedTransaksi(null);
          }}
        />
      </div>

      <CustomDataTable
        data={filteredTransaksi}
        loading={isLoading}
        columns={transaksiColumns}
      />
      <ConfirmDialog />
      <FormTransaksi
        visible={dialogMode !== null}
        onHide={() => {
          setDialogMode(null);
          setSelectedTransaksi(null);
        }}
        selectedTransaksi={selectedTransaksi}
        onSave={handleSubmit}
        token={token}
        transaksiList={transaksi}
      />
      <ToastNotifier ref={toastRef} />
    </div>
  );
}
