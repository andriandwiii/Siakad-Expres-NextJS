/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import { Divider } from "primereact/divider";

const ABSEN_START = "14:00";
const ABSEN_END = "16:00";

export default function AbsensiOCW() {
  const [isOpen, setIsOpen] = useState(false);
  const [alreadyAbsen, setAlreadyAbsen] = useState(false);
  const [status, setStatus] = useState(null);
  const [location, setLocation] = useState(null);

  const statusOptions = [
    { label: "Hadir", value: "Hadir" },
    { label: "Izin", value: "Izin" },
    { label: "Sakit", value: "Sakit" },
    { label: "Alpa", value: "Alpa" },
  ];

  // cek waktu absensi
  const checkAbsenTime = () => {
    const now = new Date();
    const [startH, startM] = ABSEN_START.split(":").map(Number);
    const [endH, endM] = ABSEN_END.split(":").map(Number);

    const start = new Date(now);
    start.setHours(startH, startM, 0, 0);

    const end = new Date(now);
    end.setHours(endH, endM, 0, 0);

    setIsOpen(now >= start && now <= end);
  };

  useEffect(() => {
    checkAbsenTime();
    const interval = setInterval(checkAbsenTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // ambil lokasi otomatis
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Browser Anda tidak mendukung geolokasi.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setLocation(coords);
      },
      (err) => {
        alert("Gagal mendapatkan lokasi: " + err.message);
      }
    );
  };

  const handleAbsen = () => {
    if (!status) {
      alert("Silakan pilih status terlebih dahulu!");
      return;
    }
    if (!location) {
      alert("Lokasi belum terdeteksi, silakan klik tombol Ambil Lokasi.");
      return;
    }

    setAlreadyAbsen(true);
    console.log("Presensi dikirim:", {
      status,
      lokasi: location,
      waktu: new Date().toISOString(),
    });
  };

  return (
    <div className="p-grid p-justify-center">
      <div className="p-col-12 p-md-8">
        <Card title="Absensi Kelas">
          {/* Header Info */}
          <div className="p-mb-3">
            <h4 className="p-m-0">Mata Pelajaran: Bahasa Indonesia</h4>
            <p className="p-m-0">Guru: Pak Yono</p>
            <p className="p-m-0">Kelas: XI C</p>
            <p className="p-mt-2 p-text-secondary">
              Presensi dibuka pukul <b>{ABSEN_START}</b> - <b>{ABSEN_END}</b>
            </p>
          </div>

          <Divider />

          {/* Tab Presensi & Materi */}
          <TabView>
            <TabPanel header="Presensi">
              {isOpen ? (
                alreadyAbsen ? (
                  <Message
                    severity="success"
                    text={`✅ Anda sudah melakukan presensi (${status})`}
                  />
                ) : (
                  <div className="p-fluid">
                    <div className="p-field">
                      <label htmlFor="status">Status Kehadiran</label>
                      <Dropdown
                        id="status"
                        value={status}
                        options={statusOptions}
                        onChange={(e) => setStatus(e.value)}
                        placeholder="Pilih Kehadiran"
                      />
                    </div>

                    <Divider />

                    <div className="p-field">
                      <label>Lokasi Anda</label>
                      {location ? (
                        <Message
                          severity="success"
                          text={`Latitude: ${location.lat.toFixed(
                            6
                          )}, Longitude: ${location.lng.toFixed(6)}`}
                        />
                      ) : (
                        <Message
                          severity="error"
                          text="Lokasi belum terdeteksi"
                        />
                      )}
                      <Button
                        label="Ambil Lokasi"
                        icon="pi pi-map-marker"
                        className="p-button-info p-mt-2"
                        onClick={getLocation}
                      />
                    </div>

                    <Divider />

                    <Button
                      label="Kirim Presensi"
                      icon="pi pi-check"
                      className="p-button-success"
                      onClick={handleAbsen}
                    />
                  </div>
                )
              ) : (
                <Message severity="warn" text="Tidak ada presensi dibuka" />
              )}
            </TabPanel>

            <TabPanel header="Materi">
              <Message severity="info" text="Tidak ada materi diunggah." />
            </TabPanel>
          </TabView>
        </Card>
      </div>
    </div>
  );
}
