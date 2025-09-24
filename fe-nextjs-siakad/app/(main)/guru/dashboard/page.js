/* eslint-disable @next/next/no-img-element */
'use client';
import { Chart } from 'primereact/chart';
import React, { useContext, useEffect, useState } from 'react';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import CustomDataTable from '@/components/DataTable'; // ✅ gunakan alias @

const lineData = {
    labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    datasets: [
        {
            label: 'Kehadiran Siswa',
            data: [20, 22, 18, 25, 24, 15, 0],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Tugas Terkumpul',
            data: [18, 20, 15, 23, 21, 12, 0],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
};

// ✅ contoh data dummy siswa
const siswaHariIni = [
    { id: 1, name: 'Budi', status: 'Hadir', waktu: '07:15' },
    { id: 2, name: 'Ani', status: 'Izin', waktu: '-' }
];

const siswaMinggu = [
    { id: 1, name: 'Budi', hadir: 5, alpa: 0 },
    { id: 2, name: 'Ani', hadir: 4, alpa: 1 }
];

const siswaBulan = [
    { id: 1, name: 'Budi', hadir: 20, alpa: 1 },
    { id: 2, name: 'Ani', hadir: 18, alpa: 3 }
];

// ✅ definisi kolom untuk tiap tabel
const columnsHariIni = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Nama' },
    { field: 'status', header: 'Status' },
    { field: 'waktu', header: 'Waktu' }
];

const columnsMinggu = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Nama' },
    { field: 'hadir', header: 'Hadir' },
    { field: 'alpa', header: 'Alpa' }
];

const columnsBulan = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Nama' },
    { field: 'hadir', header: 'Hadir' },
    { field: 'alpa', header: 'Alpa' }
];

const DashboardGuru = () => {
    const [lineOptions, setLineOptions] = useState({});
    const { layoutConfig } = useContext(LayoutContext);

    const applyLightTheme = () => {
        setLineOptions({
            plugins: { legend: { labels: { color: '#495057' } } },
            scales: {
                x: { ticks: { color: '#495057' }, grid: { color: '#ebedef' } },
                y: { ticks: { color: '#495057' }, grid: { color: '#ebedef' } }
            }
        });
    };

    const applyDarkTheme = () => {
        setLineOptions({
            plugins: { legend: { labels: { color: '#ebedef' } } },
            scales: {
                x: { ticks: { color: '#ebedef' }, grid: { color: 'rgba(160, 167, 181, .3)' } },
                y: { ticks: { color: '#ebedef' }, grid: { color: 'rgba(160, 167, 181, .3)' } }
            }
        });
    };

    useEffect(() => {
        if (layoutConfig.colorScheme === 'light') applyLightTheme();
        else applyDarkTheme();
    }, [layoutConfig.colorScheme]);

    return (
        <div className="grid">
            {/* --- 4 Summary Cards --- */}
            {/* ... card summary tetap sama ... */}

            {/* Chart Mingguan */}
            <div className="col-12">
                <div className="card">
                    <h5>Kehadiran dan Tugas Mingguan</h5>
                    <Chart type="line" data={lineData} options={lineOptions} />
                </div>
            </div>

            {/* DataTable Hari Ini */}
            <div className="col-12">
                <div className="card">
                    <h5>Data Siswa Hari Ini</h5>
                    <CustomDataTable data={siswaHariIni} columns={columnsHariIni} />
                </div>
            </div>

            {/* DataTable Minggu Ini */}
            <div className="col-12">
                <div className="card">
                    <h5>Data Siswa Minggu Ini</h5>
                    <CustomDataTable data={siswaMinggu} columns={columnsMinggu} />
                </div>
            </div>

            {/* DataTable Bulan Ini */}
            <div className="col-12">
                <div className="card">
                    <h5>Data Siswa Bulan Ini</h5>
                    <CustomDataTable data={siswaBulan} columns={columnsBulan} />
                </div>
            </div>
        </div>
    );
};

export default DashboardGuru;
