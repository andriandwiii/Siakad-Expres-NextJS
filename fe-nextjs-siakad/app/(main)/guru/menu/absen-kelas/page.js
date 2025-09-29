/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef } from "react";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Divider } from "primereact/divider";
import { Column } from "primereact/column";
import ToastNotifier from "../../../../components/ToastNotifier";
import CustomDataTable from "../../../../components/DataTable";

export default function AbsensiKelasPage() {
    const toastRef = useRef(null);

    // --- State Form Absensi Siswa ---
    const [kelasSiswa, setKelasSiswa] = useState(null);
    const [mapelSiswa, setMapelSiswa] = useState(null);
    const [jamMulai, setJamMulai] = useState(null);
    const [jamSelesai, setJamSelesai] = useState(null);
    const [catatan, setCatatan] = useState("");
    const [absensiLog, setAbsensiLog] = useState([]);

    const kelasOptions = ["XI IPA 1", "XI IPA 2", "XI IPS 1"];
    const mapelOptions = ["Matematika", "Bahasa Indonesia", "Bahasa Inggris"];

    const handleBukaAbsensiSiswa = () => {
        if (!kelasSiswa || !mapelSiswa || !jamMulai || !jamSelesai) {
            toastRef.current?.showToast('01', 'Lengkapi semua data terlebih dahulu!');
            return;
        }

        const newLogEntry = {
            id: absensiLog.length + 1,
            kelas: kelasSiswa,
            mapel: mapelSiswa,
            jam: `${jamMulai.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} - ${jamSelesai.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`,
            catatan: catatan || '-',
            waktuDibuat: new Date().toLocaleString('id-ID')
        };

        setAbsensiLog(prev => [newLogEntry, ...prev]);
        toastRef.current?.showToast('00', `Absensi untuk kelas ${kelasSiswa} (${mapelSiswa}) berhasil dibuka!`);

        // Reset form
        setKelasSiswa(null);
        setMapelSiswa(null);
        setJamMulai(null);
        setJamSelesai(null);
        setCatatan("");
    };

    const logColumns = [
        { field: 'kelas', header: 'Kelas', style: { minWidth: '100px' } },
        { field: 'mapel', header: 'Mata Pelajaran', style: { minWidth: '150px' } },
        { field: 'jam', header: 'Jam', style: { minWidth: '150px' } },
        { field: 'catatan', header: 'Catatan', style: { minWidth: '150px' } },
        { field: 'waktuDibuat', header: 'Waktu Dibuat', style: { minWidth: '150px' } },
    ];
    
    const useCustom = !!(typeof CustomDataTable !== 'undefined');

    return (
        <div className="grid justify-content-center">
            <ToastNotifier ref={toastRef} />
            <div className="col-12 md:col-10">
                <Card className="mb-4 shadow-1">
                    <h5 className="font-bold text-900">Buka Absensi Kelas</h5>
                    <p className="text-sm text-500 mb-3">Buat sesi absensi baru untuk siswa di kelas Anda.</p>
                    <Divider />
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="kelasSiswa" className="font-medium">Kelas</label>
                            <Dropdown
                                id="kelasSiswa"
                                value={kelasSiswa}
                                options={kelasOptions}
                                onChange={(e) => setKelasSiswa(e.value)}
                                placeholder="Pilih Kelas"
                            />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="mapelSiswa" className="font-medium">Mata Pelajaran</label>
                            <Dropdown
                                id="mapelSiswa"
                                value={mapelSiswa}
                                options={mapelOptions}
                                onChange={(e) => setMapelSiswa(e.value)}
                                placeholder="Pilih Mata Pelajaran"
                            />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="jamMulai" className="font-medium">Jam Mulai</label>
                            <Calendar
                                id="jamMulai"
                                value={jamMulai}
                                onChange={(e) => setJamMulai(e.value)}
                                timeOnly
                                hourFormat="24"
                                placeholder="Pilih Jam Mulai"
                                showIcon
                                className="w-full"
                            />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="jamSelesai" className="font-medium">Jam Selesai</label>
                            <Calendar
                                id="jamSelesai"
                                value={jamSelesai}
                                onChange={(e) => setJamSelesai(e.value)}
                                timeOnly
                                hourFormat="24"
                                placeholder="Pilih Jam Selesai"
                                showIcon
                                className="w-full"
                            />
                        </div>
                        <div className="field col-12">
                            <label htmlFor="catatan" className="font-medium">Catatan / Deskripsi (Opsional)</label>
                            <InputTextarea
                                id="catatan"
                                value={catatan}
                                onChange={(e) => setCatatan(e.target.value)}
                                rows={3}
                                autoResize
                                placeholder="Misalnya: Absensi harian pertemuan pertama."
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <Button label="Buka Absensi Siswa" icon="pi pi-check" className="p-button-success" onClick={handleBukaAbsensiSiswa} />
                    </div>
                </Card>
                <Card className="shadow-1">
                    <h5 className="font-bold text-900">Riwayat Sesi Absensi</h5>
                    <Divider className="my-2" />
                    {useCustom ? (
                        <CustomDataTable
                            data={absensiLog}
                            columns={logColumns}
                            paginator
                            rows={5}
                            rowsPerPageOptions={[5, 10, 20]}
                        />
                    ) : (
                        <DataTable
                            value={absensiLog}
                            paginator
                            rows={5}
                            responsiveLayout="scroll"
                            className="p-datatable-sm"
                        >
                            <Column field="kelas" header="Kelas" sortable />
                            <Column field="mapel" header="Mata Pelajaran" sortable />
                            <Column field="jam" header="Jam" sortable />
                            <Column field="catatan" header="Catatan" />
                            <Column field="waktuDibuat" header="Waktu Dibuat" sortable />
                        </DataTable>
                    )}
                </Card>
            </div>
        </div>
    );
}
