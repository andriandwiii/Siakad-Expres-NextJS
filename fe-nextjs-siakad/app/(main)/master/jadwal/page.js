"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import ToastNotifier from "../../../components/ToastNotifier";
import CustomDataTable from "../../../components/DataTable";
import FormJadwal from "./components/FormJadwal";

export default function MasterJadwalPage() {
  const toastRef = useRef(null);
  const [jadwalList, setJadwalList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogMode, setDialogMode] = useState(null);

  const [kelasOptions, setKelasOptions] = useState([]);
  const [mapelKelasOptions, setMapelKelasOptions] = useState([]);
  const [hariOptions, setHariOptions] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchJadwal();
    fetchKelas();
    fetchMapelKelas();
    fetchHari();
  }, []);

  // 🔹 Fetch semua jadwal
  const fetchJadwal = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/jadwal`);
      const json = await res.json();
      setJadwalList(json.data || []);
    } catch (err) {
      console.error(err);
      toastRef.current?.showToast("01", "Gagal memuat data jadwal");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch daftar kelas dengan nama ruang
  const fetchKelas = async () => {
    try {
      const res = await fetch(`${API_URL}/kelas`);
      const json = await res.json();
      setKelasOptions(
        json.data?.map((k) => ({
          label: `${k.TINGKATAN || "-"} ${k.NAMA_JURUSAN || "-"} - ${
            k.ruang?.NAMA_RUANG || "-"
          }`,
          value: k.KELAS_ID,
        })) || []
      );
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Fetch daftar mapel + guru
  const fetchMapelKelas = async () => {
    try {
      const res = await fetch(`${API_URL}/mapel-kelas`);
      const json = await res.json();
      setMapelKelasOptions(
        json.data?.map((m) => ({
          label: `${m.mapel?.KODE_MAPEL || "-"} - ${
            m.mapel?.NAMA_MAPEL || "-"
          } (${m.guru?.NAMA_GURU || "-"})`,
          value: m.MAPEL_KELAS_ID,
        })) || []
      );
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Fetch daftar hari
  const fetchHari = async () => {
    try {
      const res = await fetch(`${API_URL}/master-hari`);
      const json = await res.json();
      setHariOptions(
        json.data?.map((h) => ({
          label: h.NAMA_HARI,
          value: h.HARI_ID,
        })) || []
      );
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Simpan data jadwal
  const handleSave = async (data) => {
    try {
      if (dialogMode === "add") {
        await fetch(`${API_URL}/jadwal`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        toastRef.current?.showToast("00", "Jadwal berhasil ditambahkan");
      } else if (dialogMode === "edit" && selectedItem) {
        await fetch(`${API_URL}/jadwal/${selectedItem.JADWAL_ID}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        toastRef.current?.showToast("00", "Jadwal berhasil diperbarui");
      }
      fetchJadwal();
      setDialogMode(null);
      setSelectedItem(null);
    } catch (err) {
      console.error(err);
      toastRef.current?.showToast("01", "Gagal menyimpan jadwal");
    }
  };

  // 🔹 Hapus data jadwal
  const handleDelete = (row) => {
    confirmDialog({
      message: `Yakin ingin menghapus jadwal "${row.mapel?.NAMA_MAPEL}"?`,
      header: "Konfirmasi Hapus",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Hapus",
      rejectLabel: "Batal",
      acceptClassName: "p-button-danger",
      accept: async () => {
        try {
          await fetch(`${API_URL}/jadwal/${row.JADWAL_ID}`, { method: "DELETE" });
          toastRef.current?.showToast("00", "Jadwal berhasil dihapus");
          fetchJadwal();
        } catch (err) {
          console.error(err);
          toastRef.current?.showToast("01", "Gagal menghapus jadwal");
        }
      },
    });
  };

  // 🔹 Tombol aksi edit/hapus
  const actionBodyTemplate = (row) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        size="small"
        severity="warning"
        onClick={() => {
          setSelectedItem(row);
          setDialogMode("edit");
        }}
      />
      <Button
        icon="pi pi-trash"
        size="small"
        severity="danger"
        onClick={() => handleDelete(row)}
      />
    </div>
  );

  // 🔹 Kolom DataTable
  const columns = [
    { field: "JADWAL_ID", header: "ID", style: { width: "60px" } },
    {
      header: "Kelas",
      body: (row) =>
        `${row.kelas?.TINGKATAN || "-"} ${row.kelas?.NAMA_JURUSAN || "-"} ${row.kelas?.NAMA_KELAS || "-"}`,
    },

    {
      header: "Mata Pelajaran",
      body: (row) =>
        `${row.mapel?.KODE_MAPEL || "-"} - ${
          row.mapel?.NAMA_MAPEL || "-"
        } (${row.guru?.NAMA_GURU || "-"})`,
    },
    { header: "Hari", body: (row) => row.hari?.NAMA_HARI || "-" },
    { field: "JAM_MULAI", header: "Jam Mulai" },
    { field: "JAM_SELESAI", header: "Jam Selesai" },
    { header: "Actions", body: actionBodyTemplate, style: { width: "120px" } },
  ];

  return (
    <div className="card p-4">
      <h3 className="text-xl font-semibold mb-4">Master Jadwal</h3>

      <div className="flex justify-content-end mb-3">
        <Button
          label="Tambah Jadwal"
          icon="pi pi-plus"
          onClick={() => {
            setDialogMode("add");
            setSelectedItem(null);
          }}
        />
      </div>

      <CustomDataTable data={jadwalList} loading={loading} columns={columns} />

      <ConfirmDialog />

      <FormJadwal
        visible={dialogMode !== null}
        onHide={() => {
          setDialogMode(null);
          setSelectedItem(null);
        }}
        selectedItem={selectedItem}
        onSave={handleSave}
        kelasOptions={kelasOptions}
        mapelKelasOptions={mapelKelasOptions}
        hariOptions={hariOptions}
      />

      <ToastNotifier ref={toastRef} />
    </div>
  );
}
