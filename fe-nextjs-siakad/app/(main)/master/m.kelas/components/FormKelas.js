"use client";

import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

const FormKelas = ({ visible, onHide, onSave, selectedKelas, token }) => {
  const [ruangId, setRuangId] = useState(null);       // Sebagai "Nama Kelas"
  const [tingkatanId, setTingkatanId] = useState(null);
  const [jurusanId, setJurusanId] = useState(null);
  const [gedungId, setGedungId] = useState(null);

  const [jurusanList, setJurusanList] = useState([]);
  const [gedungList, setGedungList] = useState([]);
  const [tingkatanList, setTingkatanList] = useState([]);
  const [ruangList, setRuangList] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Reset form saat dialog dibuka atau data berubah
  useEffect(() => {
    if (selectedKelas) {
      setRuangId(selectedKelas.RUANG_ID || null);
      setTingkatanId(selectedKelas.TINGKATAN_ID || null);
      setJurusanId(selectedKelas.JURUSAN_ID || null);
      setGedungId(selectedKelas.GEDUNG_ID || null);
    } else if (visible) {
      setRuangId(null);
      setTingkatanId(null);
      setJurusanId(null);
      setGedungId(null);
    }
  }, [selectedKelas, visible]);

  // Fetch dropdown data
  useEffect(() => {
    if (token) {
      fetchRuang();
      fetchJurusan();
      fetchGedung();
      fetchTingkatan();
    }
  }, [token]);

  const fetchRuang = async () => {
    try {
      const res = await fetch(`${API_URL}/master-ruang`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      setRuangList(json.data || []);
    } catch (err) {
      console.error("Gagal fetch ruang", err);
    }
  };

  const fetchJurusan = async () => {
    try {
      const res = await fetch(`${API_URL}/master-jurusan`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      setJurusanList(json.data || []);
    } catch (err) {
      console.error("Gagal fetch jurusan", err);
    }
  };

  const fetchGedung = async () => {
    try {
      const res = await fetch(`${API_URL}/master-gedung`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      setGedungList(json.data || []);
    } catch (err) {
      console.error("Gagal fetch gedung", err);
    }
  };

  const fetchTingkatan = async () => {
    try {
      const res = await fetch(`${API_URL}/master-tingkatan`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      setTingkatanList(json.data || []);
    } catch (err) {
      console.error("Gagal fetch tingkatan", err);
    }
  };

  const handleSubmit = () => {
    const data = {
      ruang_id: ruangId,
      jurusan_id: jurusanId,
      gedung_id: gedungId,
      tingkatan_id: tingkatanId,
    };
    onSave(data);
  };

  return (
    <Dialog
      header={selectedKelas ? "Edit Kelas" : "Tambah Kelas"}
      visible={visible}
      style={{ width: "30vw" }}
      modal
      onHide={onHide}
    >
      <div className="p-fluid">
        {/* Nama Kelas (dari master_ruang_kelas) */}
        <div className="field">
          <label htmlFor="ruang">Nama Kelas</label>
          <Dropdown
            id="ruang"
            value={ruangId}
            options={ruangList.map((r) => ({
              label: r.NAMA_RUANG,
              value: r.RUANG_ID,
            }))}
            onChange={(e) => setRuangId(e.value)}
            placeholder="Pilih Nama Kelas"
          />
        </div>

        {/* Jurusan */}
        <div className="field">
          <label htmlFor="jurusan">Jurusan</label>
          <Dropdown
            id="jurusan"
            value={jurusanId}
            options={jurusanList.map((j) => ({
              label: j.NAMA_JURUSAN,
              value: j.JURUSAN_ID,
            }))}
            onChange={(e) => setJurusanId(e.value)}
            placeholder="Pilih Jurusan"
          />
        </div>

        {/* Gedung */}
        <div className="field">
          <label htmlFor="gedung">Gedung</label>
          <Dropdown
            id="gedung"
            value={gedungId}
            options={gedungList.map((g) => ({
              label: g.NAMA_GEDUNG,
              value: g.GEDUNG_ID,
            }))}
            onChange={(e) => setGedungId(e.value)}
            placeholder="Pilih Gedung"
          />
        </div>

        {/* Tingkatan */}
        <div className="field">
          <label htmlFor="tingkatan">Tingkatan</label>
          <Dropdown
            id="tingkatan"
            value={tingkatanId}
            options={tingkatanList.map((t) => ({
              label: t.TINGKATAN,
              value: t.TINGKATAN_ID,
            }))}
            onChange={(e) => setTingkatanId(e.value)}
            placeholder="Pilih Tingkatan"
          />
        </div>

        <div className="flex justify-content-end gap-2 mt-3">
          <Button
            label="Batal"
            icon="pi pi-times"
            className="p-button-text"
            onClick={onHide}
          />
          <Button label="Simpan" icon="pi pi-check" onClick={handleSubmit} />
        </div>
      </div>
    </Dialog>
  );
};

export default FormKelas;
