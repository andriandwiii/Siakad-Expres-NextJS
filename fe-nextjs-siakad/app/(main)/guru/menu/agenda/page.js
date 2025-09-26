/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useContext, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import CustomDataTable from '../../../../components/DataTable';
import ToastNotifier from '../../../../components/ToastNotifier';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';

const AgendaMengajarPage = () => {
    const toastRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const emptyAgenda = { id: null, tanggal: null, kelas: '', mataPelajaran: '', materi: '', status: 'Belum Dimulai' };
    const [agenda, setAgenda] = useState([]);
    const [selectedAgenda, setSelectedAgenda] = useState(emptyAgenda);

    // --- Dummy Data ---
    const kelasOptions = ['X IPA 1', 'X IPS 1', 'XI IPA 2', 'XI IPS 1', 'XII IPA 3', 'XII IPS 1'];
    const subjects = ['Matematika', 'Biologi', 'Fisika', 'Sejarah', 'Geografi', 'Sosiologi', 'Kimia', 'Ekonomi'];
    const statusOptions = ['Belum Dimulai', 'Selesai', 'Dibatalkan'];

    // --- Dummy Data Agenda ---
    const [dailyAgenda, setDailyAgenda] = useState([
        { id: 1, tanggal: new Date(), kelas: 'X IPA 1', mataPelajaran: 'Matematika', materi: 'Aljabar Lanjut', status: 'Selesai' },
        { id: 2, tanggal: new Date(), kelas: 'XI IPS 1', mataPelajaran: 'Ekonomi', materi: 'Pasar Modal', status: 'Belum Dimulai' },
        { id: 3, tanggal: new Date('2025-09-24'), kelas: 'XII IPA 3', mataPelajaran: 'Fisika', materi: 'Listrik Statis', status: 'Selesai' },
    ]);

    const handleFormSubmit = () => {
        if (!selectedAgenda.tanggal || !selectedAgenda.kelas || !selectedAgenda.mataPelajaran || !selectedAgenda.materi) {
            toastRef.current?.showToast('01', 'Harap lengkapi semua form.');
            return;
        }

        let _agenda = [...dailyAgenda];
        let _item = { ...selectedAgenda };

        if (_item.id) {
            const index = _agenda.findIndex(a => a.id === _item.id);
            _agenda[index] = _item;
            toastRef.current?.showToast('00', 'Agenda berhasil diperbarui!');
        } else {
            _item.id = Math.random().toString(36).substr(2, 9);
            _agenda.push(_item);
            toastRef.current?.showToast('00', 'Agenda berhasil ditambahkan!');
        }

        setDailyAgenda(_agenda);
        setSelectedAgenda(emptyAgenda);
        setIsFormVisible(false);
    };
    
    const handleClearForm = () => {
        setSelectedAgenda(emptyAgenda);
        setIsFormVisible(false);
    };

    const handleEdit = (rowData) => {
        setSelectedAgenda({ ...rowData });
        setIsFormVisible(true);
    };

    const handleDelete = (rowData) => {
        const _agenda = dailyAgenda.filter(a => a.id !== rowData.id);
        setDailyAgenda(_agenda);
        toastRef.current?.showToast('00', 'Agenda berhasil dihapus!');
    };
    
    const statusBodyTemplate = (rowData) => {
        let severity;
        switch (rowData.status) {
            case 'Selesai': severity = 'success'; break;
            case 'Dibatalkan': severity = 'danger'; break;
            default: severity = 'warning';
        }
        return <span className={`bg-${severity}-100 text-${severity}-600 font-bold px-2 py-1 border-round-sm text-xs`}>{rowData.status}</span>;
    };

    const actionTemplate = (rowData) => (
        <div className="flex gap-2">
            <Button icon="pi pi-pencil" size="small" severity="warning" onClick={() => handleEdit(rowData)} />
            <Button icon="pi pi-trash" size="small" severity="danger" onClick={() => handleDelete(rowData)} />
        </div>
    );
    
    const columns = [
        { field: 'tanggal', header: 'Tanggal', body: (rowData) => rowData.tanggal.toLocaleDateString('id-ID'), style: { width: '120px' } },
        { field: 'kelas', header: 'Kelas', style: { width: '100px' } },
        { field: 'mataPelajaran', header: 'Mata Pelajaran', style: { minWidth: '150px' } },
        { field: 'materi', header: 'Materi', style: { minWidth: '200px' } },
        { field: 'status', header: 'Status', body: statusBodyTemplate, style: { width: '100px' } },
        { header: 'Aksi', body: actionTemplate, style: { width: '120px' } },
    ];

    const showAgendaForm = () => {
        setIsFormVisible(true);
        setSelectedAgenda(emptyAgenda);
    };

    const onInputChange = (e, name) => {
        const val = e.target.value;
        setSelectedAgenda(prev => ({ ...prev, [name]: val }));
    };

    const onDateChange = (e) => {
        setSelectedAgenda(prev => ({ ...prev, tanggal: e.value }));
    };

    return (
        <div className="grid">
            <ToastNotifier ref={toastRef} />
            <div className="col-12">
                <Card className="mb-4 shadow-1">
                    <div className="flex justify-content-between align-items-center mb-3">
                        <h5 className="font-bold text-900">Form Agenda Mengajar</h5>
                        <Button label="Tambah Agenda" icon="pi pi-plus" onClick={showAgendaForm} />
                    </div>
                    {isFormVisible && (
                        <>
                            <Divider />
                            <div className="p-fluid formgrid grid">
                                <div className="field col-12 md:col-6 lg:col-3">
                                    <label htmlFor="tanggal" className="font-medium">Tanggal</label>
                                    <Calendar
                                        id="tanggal"
                                        value={selectedAgenda.tanggal}
                                        onChange={onDateChange}
                                        dateFormat="dd/mm/yy"
                                        placeholder="Pilih Tanggal"
                                    />
                                </div>
                                <div className="field col-12 md:col-6 lg:col-3">
                                    <label htmlFor="kelas" className="font-medium">Kelas</label>
                                    <Dropdown
                                        id="kelas"
                                        value={selectedAgenda.kelas}
                                        options={kelasOptions}
                                        onChange={(e) => onInputChange(e, 'kelas')}
                                        placeholder="Pilih Kelas"
                                    />
                                </div>
                                <div className="field col-12 md:col-6 lg:col-3">
                                    <label htmlFor="mataPelajaran" className="font-medium">Mata Pelajaran</label>
                                    <Dropdown
                                        id="mataPelajaran"
                                        value={selectedAgenda.mataPelajaran}
                                        options={subjects}
                                        onChange={(e) => onInputChange(e, 'mataPelajaran')}
                                        placeholder="Pilih Mata Pelajaran"
                                    />
                                </div>
                                <div className="field col-12 md:col-6 lg:col-3">
                                    <label htmlFor="status" className="font-medium">Status</label>
                                    <Dropdown
                                        id="status"
                                        value={selectedAgenda.status}
                                        options={statusOptions}
                                        onChange={(e) => onInputChange(e, 'status')}
                                        placeholder="Pilih Status"
                                    />
                                </div>
                                <div className="field col-12">
                                    <label htmlFor="materi" className="font-medium">Materi yang Diajarkan</label>
                                    <InputTextarea
                                        id="materi"
                                        value={selectedAgenda.materi}
                                        onChange={(e) => onInputChange(e, 'materi')}
                                        rows={3}
                                        autoResize
                                    />
                                </div>
                            </div>
                            <div className="flex justify-content-end gap-2 mt-4">
                                <Button label="Batal" icon="pi pi-times" outlined onClick={handleClearForm} />
                                <Button label="Simpan" icon="pi pi-save" onClick={handleFormSubmit} />
                            </div>
                        </>
                    )}
                </Card>
            </div>

            <div className="col-12">
                <Card className="shadow-1">
                    <h5 className="font-bold text-900">Riwayat Agenda Mengajar</h5>
                    <p className="text-sm text-500 mb-3">Lihat dan kelola semua agenda mengajar yang telah Anda buat.</p>
                    <Divider className="my-2" />
                    <CustomDataTable
                        data={dailyAgenda}
                        columns={columns}
                        paginator
                        rows={10}
                        rowsPerPageOptions={[10, 20]}
                    />
                </Card>
            </div>
        </div>
    );
};

export default AgendaMengajarPage;
