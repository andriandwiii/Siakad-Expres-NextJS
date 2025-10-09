"use client";

import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";

const SiswaDetailDialog = ({ visible, onHide, siswa }) => {
  return (
    <Dialog
      header="Detail Siswa"
      visible={visible}
      style={{ width: "700px" }}
      modal
      draggable={false}
      onHide={onHide}
      className="p-fluid"
    >
      {siswa ? (
        <>
          <Card className="shadow-md border-round-lg mb-3">
            <div className="grid text-sm p-3">
              <div className="col-6">
                <p><strong>ID:</strong> {siswa.SISWA_ID}</p>
                <p><strong>NIS:</strong> {siswa.NIS}</p>
                <p><strong>NISN:</strong> {siswa.NISN}</p>
                <p><strong>Nama:</strong> {siswa.NAMA}</p>
                <p><strong>Email:</strong> {siswa.EMAIL}</p>
              </div>
              <div className="col-6">
                <p><strong>Jenis Kelamin:</strong> {siswa.GENDER === "L" ? "Laki-laki" : "Perempuan"}</p>
                <p><strong>Tanggal Lahir:</strong> {siswa.TGL_LAHIR ? new Date(siswa.TGL_LAHIR).toLocaleDateString() : "-"}</p>
                <p><strong>Status:</strong> {siswa.STATUS}</p>
                <p><strong>Kelas/Jurusan:</strong> {siswa.KELAS} / {siswa.JURUSAN}</p>
              </div>
            </div>
          </Card>

          <Divider align="center">Orang Tua / Wali</Divider>

          {siswa.orang_tua && siswa.orang_tua.length > 0 ? (
            siswa.orang_tua.map((ortu, index) => (
              <Card key={index} className="shadow-md border-round-lg mb-2">
                <div className="grid text-sm p-3">
                  <div className="col-6">
                    <p><strong>Jenis:</strong> {ortu.JENIS}</p>
                    <p><strong>Nama:</strong> {ortu.NAMA}</p>
                  </div>
                  <div className="col-6">
                    <p><strong>Pekerjaan:</strong> {ortu.PEKERJAAN || "-"}</p>
                    <p><strong>Pendidikan:</strong> {ortu.PENDIDIKAN || "-"}</p>
                    <p><strong>No HP:</strong> {ortu.NO_HP || "-"}</p>
                    <p><strong>Alamat:</strong> {ortu.ALAMAT || "-"}</p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500">Belum ada data orang tua/wali</p>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">Memuat data...</p>
      )}
    </Dialog>
  );
};

export default SiswaDetailDialog;
