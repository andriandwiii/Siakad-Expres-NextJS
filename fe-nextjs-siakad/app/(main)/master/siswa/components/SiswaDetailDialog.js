"use client";

import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";

const SiswaDetailDialog = ({ visible, onHide, siswa }) => {
  return (
    <Dialog
      header="Detail Siswa"
      visible={visible}
      style={{ width: "600px" }}
      modal
      draggable={false}
      onHide={onHide}
      className="p-fluid"
    >
      {siswa ? (
        <Card className="shadow-md border-round-lg">
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
            </div>
          </div>
        </Card>
      ) : (
        <p className="text-center text-gray-500">Memuat data...</p>
      )}
    </Dialog>
  );
};

export default SiswaDetailDialog;
