/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Divider } from 'primereact/divider';
import { Badge } from 'primereact/badge';
import ToastNotifier from '../../../../components/ToastNotifier'; 
import CustomDataTable from '../../../../components/DataTable'; 

const ABSEN_START = "06:00";
const ABSEN_END = "16:00";

export default function AbsensiGuruPage() {
    const toastRef = useRef(null); // Changed from 'toast' to 'toastRef' to match ToastNotifier component
    const [absensi, setAbsensi] = useState([
        { id: 1, tanggal: '2025-09-25', status: 'Hadir', jamMasuk: '07:05', jamKeluar: '14:00', lokasi: { lat: -7.250445, lng: 112.768845 } },
        { id: 2, tanggal: '2025-09-24', status: 'Hadir', jamMasuk: '07:00', jamKeluar: '14:05', lokasi: { lat: -7.250445, lng: 112.768845 } },
        { id: 3, tanggal: '2025-09-23', status: 'Izin', jamMasuk: '-', jamKeluar: '-', lokasi: null },
    ]);

    const [status, setStatus] = useState('Hadir');
    const [location, setLocation] = useState(null);
    const [todayAbsen, setTodayAbsen] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const statusOptions = ['Hadir', 'Izin', 'Sakit', 'Alpa'];

    // Cek waktu absen
    const checkAbsenTime = () => {
        const now = new Date();
        const [startH, startM] = ABSEN_START.split(":").map(Number);
        const [endH, endM] = ABSEN_END.split(":").map(Number);

        const start = new Date(now); start.setHours(startH, startM, 0, 0);
        const end = new Date(now); end.setHours(endH, endM, 0, 0);

        setIsOpen(now >= start && now <= end);
    };

    useEffect(() => {
        checkAbsenTime();
        const interval = setInterval(checkAbsenTime, 60000);

        // Cek apakah guru sudah absen hari ini
        const today = new Date().toISOString().split('T')[0];
        const todayRecord = absensi.find(a => a.tanggal === today);
        if (todayRecord) setTodayAbsen(todayRecord);

        return () => clearInterval(interval);
    }, [absensi]);

    // Ambil lokasi otomatis
    const getLocation = () => {
        if (!navigator.geolocation) {
            toastRef.current?.showToast('01', 'Browser tidak mendukung geolokasi.');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                toastRef.current?.showToast('00', 'Lokasi berhasil diambil.');
            },
            (err) => toastRef.current?.showToast('01', `Gagal mendapatkan lokasi: ${err.message}`)
        );
    };

    // Check-in / Check-out
    const handleAbsen = () => {
        const today = new Date().toISOString().split('T')[0];
        
        if (!todayAbsen) {
            // Check-in
            if (!status) {
                toastRef.current?.showToast('01', 'Silakan pilih status terlebih dahulu!');
                return;
            }
        
            if (!location) {
                toastRef.current?.showToast('01', 'Lokasi belum diambil');
                return;
            }

            const jamMasuk = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            const newRecord = { id: Date.now(), tanggal: today, status, jamMasuk, jamKeluar: '-', lokasi: location };
            setAbsensi(prev => [newRecord, ...prev]);
            setTodayAbsen(newRecord);
            toastRef.current?.showToast('00', `Check-in (${status}) berhasil`);
        } else if (todayAbsen && todayAbsen.jamKeluar === '-') {
            // Check-out
            const jamKeluar = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            setAbsensi(prev => prev.map(a => a.tanggal === today ? { ...a, jamKeluar } : a));
            setTodayAbsen(prev => ({ ...prev, jamKeluar }));
            toastRef.current?.showToast('00', 'Check-out berhasil');
        } else {
            toastRef.current?.showToast('99', 'Anda sudah check-out hari ini');
        }
    };

    const statusBadge = (status) => {
        let severity;
        switch(status) {
            case 'Hadir': severity = 'success'; break;
            case 'Izin': severity = 'info'; break;
            case 'Sakit': severity = 'warning'; break;
            case 'Alpa': severity = 'danger'; break;
            default: severity = 'secondary';
        }
        return <Badge value={status} severity={severity} className="text-sm font-semibold" />;
    };

    const logColumns = [
        { field: 'tanggal', header: 'Tanggal', style: { width: '100px' } },
        { field: 'status', header: 'Status', body: (row) => statusBadge(row.status), style: { width: '100px' } },
        { field: 'jamMasuk', header: 'Masuk', style: { width: '80px' } },
        { field: 'jamKeluar', header: 'Keluar', style: { width: '80px' } },
        {
            header: 'Lokasi',
            body: (row) => row.lokasi ? `Lat: ${row.lokasi.lat.toFixed(6)}, Lng: ${row.lokasi.lng.toFixed(6)}` : '-',
        },
    ];

    const useCustom = !!(typeof CustomDataTable !== 'undefined');

    return (
        <div className="grid justify-content-center">
            <ToastNotifier ref={toastRef} />
            <div className="col-12 md:col-10">
                <Card className="mb-4 shadow-1">
                    <div className="flex justify-content-between align-items-center mb-3">
                        <div className="text-xl font-bold text-900">Absensi Guru</div>
                        <div className="text-xs text-500">
                            {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                    </div>
                    <Divider className="my-2" />
                    
                    <div className="text-center text-sm mb-3">
                        Waktu presensi: <span className="font-bold text-blue-600">{ABSEN_START}</span> - <span className="font-bold text-red-600">{ABSEN_END}</span>
                    </div>

                    <div className="flex flex-column align-items-center mb-4">
                        {isOpen ? (
                            todayAbsen ? (
                                <Card className="w-full mt-3 shadow-1 surface-ground">
                                    <div className="flex justify-content-between align-items-center mb-3">
                                        <div>
                                            <p className="font-semibold text-lg">Status Hari Ini:</p>
                                            <div className="mt-1">{statusBadge(todayAbsen.status)}</div>
                                        </div>
                                        {todayAbsen.jamKeluar === '-' && (
                                            <Button label="Check-out" icon="pi pi-sign-out" className="p-button-danger p-button-sm" onClick={handleAbsen} />
                                        )}
                                    </div>
                                    <div className="text-sm text-500">
                                        <p>Jam Masuk: <span className="font-bold text-900">{todayAbsen.jamMasuk}</span></p>
                                        <p>Jam Keluar: <span className="font-bold text-900">{todayAbsen.jamKeluar !== '-' ? todayAbsen.jamKeluar : 'Belum'}</span></p>
                                        {todayAbsen.lokasi && <p>Lokasi: <span className="font-bold text-900">Lat {todayAbsen.lokasi.lat.toFixed(6)}, Lng {todayAbsen.lokasi.lng.toFixed(6)}</span></p>}
                                    </div>
                                </Card>
                            ) : (
                                <Card className="w-full mt-3 shadow-1 surface-ground">
                                    <div className="p-fluid">
                                        <div className="field">
                                            <label htmlFor="status" className="font-medium text-sm text-500">Status Kehadiran</label>
                                            <Dropdown value={status} options={statusOptions} onChange={e => setStatus(e.value)} placeholder="Pilih status" className="w-full" />
                                        </div>
                                        <div className="field flex justify-content-between align-items-center gap-2">
                                            <Button label="Ambil Lokasi" icon="pi pi-map-marker" className="p-button-info p-button-sm flex-grow-1" onClick={getLocation} />
                                            <div className="p-text-center">
                                                {location && <i className="pi pi-check-circle text-green-500 text-xl" />}
                                                {!location && <i className="pi pi-times-circle text-red-500 text-xl" />}
                                            </div>
                                        </div>
                                        <div className="text-center mt-3">
                                            <Button label="Check-in" icon="pi pi-check" className="p-button-success p-button-lg" onClick={handleAbsen} />
                                        </div>
                                    </div>
                                </Card>
                            )
                        ) : (
                            <div className="text-center mt-3 p-4 border-round-md bg-gray-100">
                                <i className="pi pi-clock text-4xl text-blue-500 mb-2" />
                                <p className="font-bold text-900">Presensi belum dibuka</p>
                                <p className="text-sm text-500">Silakan cek kembali pada waktu yang ditentukan.</p>
                            </div>
                        )}
                    </div>
                </Card>
            </div>

            <div className="col-12 md:col-10">
                <Card className="shadow-1">
                    <h5 className="font-bold text-900">Riwayat Absensi</h5>
                    <Divider className="my-2" />
                    {useCustom ? (
                        <CustomDataTable
                            data={absensi}
                            columns={logColumns}
                            paginator
                            rows={5}
                            rowsPerPageOptions={[5, 10, 20]}
                        />
                    ) : (
                        <DataTable value={absensi} paginator rows={5} responsiveLayout="scroll" className="p-datatable-sm">
                            <Column field="tanggal" header="Tanggal" sortable />
                            <Column field="status" header="Status" body={(row) => statusBadge(row.status)} sortable />
                            <Column field="jamMasuk" header="Jam Masuk" sortable />
                            <Column field="jamKeluar" header="Jam Keluar" sortable />
                            <Column
                                header="Lokasi"
                                body={(row) => row.lokasi ? `Lat: ${row.lokasi.lat.toFixed(6)}, Lng: ${row.lokasi.lng.toFixed(6)}` : '-'}
                            />
                        </DataTable>
                    )}
                </Card>
            </div>
        </div>
    );
}
