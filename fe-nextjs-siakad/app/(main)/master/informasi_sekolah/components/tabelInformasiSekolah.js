"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

// CSS untuk styling tabel
const TabelInformasiSekolahStyles = {
  datatable: {
    backgroundColor: "#f4f4f9", /* Latar belakang tabel yang lembut */
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  datatableHeader: {
    backgroundColor: "#007ad9", /* Warna header tabel */
    color: "#fff",
    fontWeight: "bold",
  },
  columnHeader: {
    fontSize: "16px",
  },
  columnHeaderContent: {
    color: "#ffffff",
  },
  rowHover: {
    backgroundColor: "#e0f7fa", /* Warna hover untuk baris */
  },
  cell: {
    padding: "10px", /* Padding untuk cell tabel */
  },
  button: {
    transition: "all 0.3s ease-in-out",
  },
  buttonHover: {
    transform: "scale(1.05)", /* Efek zoom saat hover pada tombol */
  },
  buttonWarning: {
    backgroundColor: "#f9a825", /* Warna tombol edit */
    border: "none",
  },
  buttonWarningHover: {
    backgroundColor: "#f57f17", /* Warna hover tombol edit */
  },
  buttonDanger: {
    backgroundColor: "#d32f2f", /* Warna tombol hapus */
    border: "none",
  },
  buttonDangerHover: {
    backgroundColor: "#c62828", /* Warna hover tombol hapus */
  },
  responsive: {
    "@media (max-width: 768px)": {
      fontSize: "14px", /* Ukuran font lebih kecil pada layar kecil */
    },
  },
};

const TabelInformasiSekolah = ({ data, loading, onEdit, onDelete }) => {
  return (
    <DataTable value={data} paginator rows={10} loading={loading} size="small" scrollable style={TabelInformasiSekolahStyles.datatable}>
      <Column field="NAMA_SEKOLAH" header="Nama Sekolah" />
      <Column field="ALAMAT" header="Alamat" />
      <Column field="JENJANG_AKREDITASI" header="Jenjang Akreditasi" />
      <Column field="TANGGAL_AKREDITASI" header="Tanggal Akreditasi" />
      <Column field="NPSN" header="NPSN" />
      <Column field="STATUS" header="Status" />
      <Column
        header="Aksi"
        body={(row) => (
          <div className="flex gap-2">
            <Button
              icon="pi pi-pencil"
              size="small"
              severity="warning"
              style={TabelInformasiSekolahStyles.buttonWarning}
              onMouseEnter={(e) => (e.target.style.backgroundColor = TabelInformasiSekolahStyles.buttonWarningHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = TabelInformasiSekolahStyles.buttonWarning.backgroundColor)}
              onClick={() => onEdit(row)}
            />
            <Button
              icon="pi pi-trash"
              size="small"
              severity="danger"
              style={TabelInformasiSekolahStyles.buttonDanger}
              onMouseEnter={(e) => (e.target.style.backgroundColor = TabelInformasiSekolahStyles.buttonDangerHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = TabelInformasiSekolahStyles.buttonDanger.backgroundColor)}
              onClick={() => onDelete(row)}
            />
          </div>
        )}
        style={{ width: "150px" }}
      />
    </DataTable>
  );
};

export default TabelInformasiSekolah;
