"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import ToastNotifier from "../../../components/ToastNotifier";
import CustomDataTable from "../../../components/DataTable";
import FormMapelKelas from "./components/FormMapelKelas";

export default function MasterMapelKelasPage() {
  const toastRef = useRef(null);
  const [mapelKelasList, setMapelKelasList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogMode, setDialogMode] = useState(null);

  const [kelasOptions, setKelasOptions] = useState([]);
  const [mapelOptions, setMapelOptions] = useState([]);
  const [guruOptions, setGuruOptions] = useState([]);

  const [mapelMap, setMapelMap] = useState({}); // <-- untuk lookup kode mapel

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchMapel();
    fetchKelas();
    fetchGuru();
    fetchMapelKelas();
  }, []);

  const fetchMapelKelas = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/mapel-kelas`);
      const json = await res.json();
      setMapelKelasList(json.data || []);
    } catch (err) {
      console.error(err);
      toastRef.current?.showToast("01", "Gagal memuat data mapel kelas");
    } finally {
      setLoading(false);
    }
  };

  const fetchKelas = async () => {
    try {
      const res = await fetch(`${API_URL}/kelas`);
      const json = await res.json();
      setKelasOptions(
        json.data?.map((k) => ({
          label: `${k.TINGKATAN} ${k.NAMA_JURUSAN} ${k.NAMA_KELAS}`,
          value: k.KELAS_ID,
        })) || []
      );
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMapel = async () => {
    try {
      const res = await fetch(`${API_URL}/mapel`);
      const json = await res.json();

      // buat map lookup untuk kode mapel
      const map = {};
      json.data?.forEach((m) => {
        map[m.MAPEL_ID] = m;
      });
      setMapelMap(map);

      setMapelOptions(
        json.data?.map((m) => ({
          label: `${m.KODE_MAPEL} - ${m.NAMA_MAPEL}`,
          value: m.MAPEL_ID,
        })) || []
      );
    } catch (err) {
      console.error(err);
    }
  };

  const fetchGuru = async () => {
    try {
      const res = await fetch(`${API_URL}/master-guru`);
      const json = await res.json();
      setGuruOptions(
        json.data?.map((g) => ({
          label: `${g.GELAR_DEPAN ? g.GELAR_DEPAN + " " : ""}${g.NAMA}${g.GELAR_BELAKANG ? ", " + g.GELAR_BELAKANG : ""}`,
          value: g.GURU_ID,
        })) || []
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (data) => {
    try {
      if (dialogMode === "add") {
        await fetch(`${API_URL}/mapel-kelas`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        toastRef.current?.showToast("00", "Mapel-Kelas berhasil ditambahkan");
      } else if (dialogMode === "edit" && selectedItem) {
        await fetch(`${API_URL}/mapel-kelas/${selectedItem.MAPEL_KELAS_ID}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        toastRef.current?.showToast("00", "Mapel-Kelas berhasil diperbarui");
      }
      fetchMapelKelas();
      setDialogMode(null);
      setSelectedItem(null);
    } catch (err) {
      console.error(err);
      toastRef.current?.showToast("01", "Gagal menyimpan Mapel-Kelas");
    }
  };

  const handleDelete = (row) => {
    confirmDialog({
      message: `Yakin ingin menghapus mapel kelas "${mapelMap[row.MAPEL_ID]?.KODE_MAPEL}"?`,
      header: "Konfirmasi Hapus",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Hapus",
      rejectLabel: "Batal",
      acceptClassName: "p-button-danger",
      accept: async () => {
        try {
          await fetch(`${API_URL}/mapel-kelas/${row.MAPEL_KELAS_ID}`, { method: "DELETE" });
          toastRef.current?.showToast("00", "Mapel-Kelas berhasil dihapus");
          fetchMapelKelas();
        } catch (err) {
          console.error(err);
          toastRef.current?.showToast("01", "Gagal menghapus Mapel-Kelas");
        }
      },
    });
  };

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

  const namaGuruTemplate = (row) => {
    const guruData = row.guru;
    if (!guruData) return "-";
    const depan = guruData.GELAR_DEPAN ? guruData.GELAR_DEPAN + " " : "";
    const belakang = guruData.GELAR_BELAKANG ? ", " + guruData.GELAR_BELAKANG : "";
    return `${depan}${guruData.NAMA_GURU}${belakang}`;
  };

  const columns = [
    { field: "MAPEL_KELAS_ID", header: "ID", style: { width: "60px" } },
    {
      field: "kelasLabel",
      header: "Kelas",
      body: (row) => `${row.kelas?.TINGKATAN} ${row.kelas?.NAMA_JURUSAN} ${row.kelas?.NAMA_KELAS}`,
    },
    {
      field: "mapelLabel",
      header: "Mata Pelajaran",
      body: (row) => {
        const mapelData = mapelMap[row.MAPEL_ID];
        return mapelData ? `${mapelData.KODE_MAPEL} - ${mapelData.NAMA_MAPEL}` : "-";
      },
    },
    { header: "Guru", body: namaGuruTemplate, style: { minWidth: "200px" } },
    { field: "KODE_MAPEL", header: "Kode Mapel" },
    { header: "Actions", body: actionBodyTemplate, style: { width: "120px" } },
  ];

  return (
    <div className="card p-4">
      <h3 className="text-xl font-semibold mb-4">Master Mapel-Kelas</h3>

      <div className="flex justify-content-end mb-3">
        <Button
          label="Tambah Mapel-Kelas"
          icon="pi pi-plus"
          onClick={() => {
            setDialogMode("add");
            setSelectedItem(null);
          }}
        />
      </div>

      <CustomDataTable data={mapelKelasList} loading={loading} columns={columns} />

      <ConfirmDialog />

      <FormMapelKelas
        visible={dialogMode !== null}
        onHide={() => {
          setDialogMode(null);
          setSelectedItem(null);
        }}
        selectedItem={selectedItem}
        onSave={handleSave}
        kelasOptions={kelasOptions}
        mapelOptions={mapelOptions}
        guruOptions={guruOptions}
      />

      <ToastNotifier ref={toastRef} />
    </div>
  );
}
