'use client';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ToastNotifier from '../../../../components/ToastNotifier';
import '@/styles/gradient.css';
import axios from 'axios';

// --- Tipe dan Data Konstan ---

type ToastNotifierHandle = {
  showToast: (status: string, message?: string) => void;
};

const genderOptions = [
  { label: 'Laki-laki', value: 'L' },
  { label: 'Perempuan', value: 'P' },
];

const RegisterSiswaPage = () => {
  const router = useRouter();
  const toastRef = useRef<ToastNotifierHandle>(null);

  const [form, setForm] = useState({
    nis: '',
    nisn: '',
    nama: '',
    email: '',
    password: '',
    gender: '',
    tgl_lahir: null as Date | null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        nis: form.nis.trim(),
        nisn: form.nisn.trim(),
        nama: form.nama.trim(),
        email: form.email.trim(),
        password: form.password.trim(),
        gender: form.gender,
        tgl_lahir: form.tgl_lahir
          ? form.tgl_lahir.toISOString().split('T')[0] // format YYYY-MM-DD
          : null,
        status: 'Aktif',
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register-siswa`,
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const data = res.data;

      if (data.status !== '00') {
        toastRef.current?.showToast(data.status, data.message || 'Register gagal');
        setLoading(false);
        return;
      }

      toastRef.current?.showToast('00', 'Siswa berhasil didaftarkan');

      setTimeout(() => {
        router.push('/auth/login');
      }, 1500);
    } catch (err: any) {
      toastRef.current?.showToast(
        '99',
        err.response?.data?.message || 'Terjadi kesalahan koneksi'
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex justify-content-center align-items-center">
      <ToastNotifier ref={toastRef} />
      {/* Container utama dengan background gradient */}
      <div className="animated-gradient-bg w-full h-full flex justify-content-center align-items-center p-4">
        
        {/* Card Container Utama: Menggunakan styling untuk tampilan seperti kartu besar */}
        <div className="card surface-card w-full md:w-8 lg:w-7 xl:w-6 p-0 shadow-6 rounded-lg overflow-hidden">
          {/* Grid Konten: Form (col-6) dan Gambar (col-6) */}
          <div className="grid h-auto m-0"> 

            {/* Kolom Kiri: Form Registrasi */}
            <div className="col-12 md:col-6 flex flex-col justify-content-center p-5">
              <div className="w-full">
                
                {/* Judul Registrasi yang Jelas dan Menonjol */}
                <h1 className="text-3xl font-bold mb-2 text-900">
                  Register Siswa
                </h1>
                <p className="text-color-secondary mb-5">
                  Lengkapi data diri untuk membuat akun siswa baru.
                </p>

                <form className="grid p-fluid" onSubmit={handleSubmit}>
                  
                  {/* BARIS 1: NIS dan NISN */}
                  <div className="col-12 md:col-6 mb-3">
                    <label htmlFor="nis" className="block text-900 font-medium mb-2">NIS</label>
                    <InputText 
                      id="nis" 
                      value={form.nis} 
                      onChange={handleChange} 
                      placeholder="SIS123456" 
                      required 
                    />
                  </div>
                  <div className="col-12 md:col-6 mb-3">
                    <label htmlFor="nisn" className="block text-900 font-medium mb-2">NISN</label>
                    <InputText 
                      id="nisn" 
                      value={form.nisn} 
                      onChange={handleChange} 
                      placeholder="1234567890" 
                      required 
                    />
                  </div>

                  {/* BARIS 2: Nama Lengkap dan Email */}
                  <div className="col-12 md:col-6 mb-3">
                    <label htmlFor="nama" className="block text-900 font-medium mb-2">Nama Lengkap</label>
                    <InputText 
                      id="nama" 
                      value={form.nama} 
                      onChange={handleChange} 
                      placeholder="Andrian Dwi" 
                      required 
                    />
                  </div>
                  <div className="col-12 md:col-6 mb-3">
                    <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                    <InputText 
                      id="email" 
                      value={form.email} 
                      onChange={handleChange} 
                      placeholder="andrian@gmail.com" 
                      type="email" 
                      required 
                    />
                  </div>
                  
                  {/* BARIS 3: Password (Lebar Penuh) */}
                  <div className="col-12 mb-3"> 
                      <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                      <InputText 
                          id="password" 
                          value={form.password} 
                          onChange={handleChange} 
                          placeholder="Minimal 8 karakter" 
                          type="password" 
                          required 
                      />
                  </div>

                  {/* BARIS 4: Gender dan Tanggal Lahir */}
                  <div className="col-12 md:col-6 mb-3">
                    <label className="block text-900 font-medium mb-2">Jenis Kelamin</label>
                    <Dropdown 
                      value={form.gender} 
                      options={genderOptions} 
                      onChange={(e) => setForm((prev) => ({ ...prev, gender: e.value }))} 
                      placeholder="Pilih Gender" 
                      required 
                    />
                  </div>

                  <div className="col-12 md:col-6 mb-3">
                    <label className="block text-900 font-medium mb-2">Tanggal Lahir</label>
                    <Calendar 
                      value={form.tgl_lahir} 
                      onChange={(e) => setForm((prev) => ({ ...prev, tgl_lahir: e.value as Date }))} 
                      dateFormat="yy-mm-dd" 
                      showIcon 
                      placeholder="YYYY-MM-DD" 
                      required 
                    />
                  </div>

                  {/* Tombol Register */}
                  <div className="col-12 mt-3">
                    <Button 
                      type="submit" 
                      label={loading ? 'Loading...' : 'Register'} 
                      disabled={loading} 
                      className="w-full p-3 text-lg" 
                    />
                  </div>
                  
                  {/* Link ke halaman Login */}
                  <div className="col-12 text-center mt-3">
                      <Button 
                          label="Sudah punya akun? Login di sini" 
                          link 
                          onClick={() => router.push('/auth/login')}
                      />
                  </div>
                </form>
              </div>
            </div>

            {/* Kolom Kanan: Gambar (Sembunyi di Mobile) */}
            <div className="hidden md:block md:col-6"> 
              <img
                src="https://images.unsplash.com/photo-1604311795833-25e1d5c128c6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8OSUzQTE2fGVufDB8fDB8fHww"
                className="w-full h-full object-cover" 
                alt="Ilustrasi siswa sedang belajar"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSiswaPage;