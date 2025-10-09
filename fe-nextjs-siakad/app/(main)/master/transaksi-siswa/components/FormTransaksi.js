"use client";

import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const FormTransaksi = ({ visible, onHide, onSave, selectedTransaksi, token, transaksiList }) => {
  const [siswaId, setSiswaId] = useState(null);
  const [kelasId, setKelasId] = useState(null);
  const [tahunAjaran, setTahunAjaran] = useState("");
  const [status, setStatus] = useState("Aktif");

  const [siswaList, setSiswaList] = useState([]);
  const [kelasList, setKelasList] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Set data form saat edit atau reset saat tambah
  useEffect(() => {
    if (selectedTransaksi) {
      setSiswaId(selectedTransaksi.SISWA_ID || null);
      setKelasId(selectedTransaksi.KELAS_ID || null);
      setTahunAjaran(selectedTransaksi.TAHUN_AJARAN || "");
      setStatus(selectedTransaksi.STATUS || "Aktif");
    } else {
      setSiswaId(null);
      setKelasId(null);
      setTahunAjaran("");
      setStatus("Aktif");
    }
  }, [selectedTransaksi, visible]);

  // Fetch semua kelas
  useEffect(() => {
    if (token) fetchKelas();
  }, [token]);

  // Fetch siswa dan filter yang sudah ada di transaksi
  useEffect(() => {
    if (token) fetchSiswa();
  }, [transaksiList, token, selectedTransaksi]);

  const fetchSiswa = async () => {
    try {
      const res = await fetch(`${API_URL}/siswa`, { headers: { Authorization: `Bearer ${token}` } });
      const json = await res.json();
      let siswaData = json.data || [];

      // Ambil ID siswa yang sudah masuk transaksi
      const usedSiswaIds = transaksiList.map(t => t.SISWA_ID);

      // Filter siswa yang belum ada di transaksi, kecuali saat edit
      if (selectedTransaksi) {
        siswaData = siswaData.filter(
          s => !usedSiswaIds.includes(s.SISWA_ID) || s.SISWA_ID === selectedTransaksi.SISWA_ID
        );
      } else {
        siswaData = siswaData.filter(s => !usedSiswaIds.includes(s.SISWA_ID));
      }

      setSiswaList(siswaData);
    } catch (err) {
      console.error("Gagal fetch siswa", err);
    }
  };

  const fetchKelas = async () => {
    try {
      const res = await fetch(`${API_URL}/master-kelas`, { headers: { Authorization: `Bearer ${token}` } });
      const json = await res.json();
      const kelasData = json.data || [];

      // Buat label gabungan: TINGKATAN + NAMA_JURUSAN + NAMA_KELAS
      const formatted = kelasData.map(k => ({
        ...k,
        label: `${k.TINGKATAN || ""} ${k.NAMA_JURUSAN || ""} ${k.NAMA_KELAS || ""}`.trim(),
        value: k.KELAS_ID
      }));

      setKelasList(formatted);
    } catch (err) {
      console.error("Gagal fetch kelas", err);
    }
  };

  const handleSubmit = () => {
    if (!siswaId || !kelasId || !tahunAjaran) return alert("Lengkapi semua field!");
    const data = {
      SISWA_ID: siswaId,
      KELAS_ID: kelasId,
      TAHUN_AJARAN: parseInt(tahunAjaran),
      STATUS: status,
    };
    onSave(data);
  };

  return (
    <Dialog
      header={selectedTransaksi ? "Edit Transaksi" : "Tambah Transaksi"}
      visible={visible}
      style={{ width: "30vw" }}
      modal
      onHide={onHide}
    >
      <div className="p-fluid">
        <div className="field">
          <label htmlFor="siswa">Siswa</label>
          <Dropdown
            id="siswa"
            value={siswaId}
            options={siswaList.map((s) => ({ label: s.NAMA, value: s.SISWA_ID }))}
            onChange={(e) => setSiswaId(e.value)}
            placeholder="Pilih Siswa"
          />
        </div>

        <div className="field">
          <label htmlFor="kelas">Kelas</label>
          <Dropdown
            id="kelas"
            value={kelasId}
            options={kelasList} // sudah memiliki label gabungan
            onChange={(e) => setKelasId(e.value)}
            placeholder="Pilih Kelas"
          />
        </div>

        <div className="field">
          <label htmlFor="tahun">Tahun Ajaran</label>
          <InputText
            id="tahun"
            value={tahunAjaran}
            onChange={(e) => setTahunAjaran(e.target.value)}
            placeholder="Contoh: 2025"
          />
        </div>

        <div className="field">
          <label htmlFor="status">Status</label>
          <Dropdown
            id="status"
            value={status}
            options={["Aktif", "Lulus", "Pindah", "Nonaktif"].map(s => ({ label: s, value: s }))}
            onChange={(e) => setStatus(e.value)}
            placeholder="Pilih Status"
          />
        </div>

        <div className="flex justify-content-end gap-2 mt-3">
          <Button label="Batal" icon="pi pi-times" className="p-button-text" onClick={onHide} />
          <Button label="Simpan" icon="pi pi-check" onClick={handleSubmit} />
        </div>
      </div>
    </Dialog>
  );
};

export default FormTransaksi;
