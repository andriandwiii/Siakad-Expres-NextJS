"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

// CSS untuk styling tabel
const TabelAsetStyles = {
  datatable: {
    backgroundColor: "#f4f4f9",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  datatableHeader: {
    backgroundColor: "#007ad9",
    color: "#fff",
    fontWeight: "bold",
  },
  rowHover: {
    backgroundColor: "#e0f7fa",
  },
  cell: {
    padding: "10px",
  },
  buttonWarning: {
    backgroundColor: "#f9a825",
    border: "none",
  },
  buttonWarningHover: {
    backgroundColor: "#f57f17",
  },
  buttonDanger: {
    backgroundColor: "#d32f2f",
    border: "none",
  },
  buttonDangerHover: {
    backgroundColor: "#c62828",
  },
};

const TabelAset = ({ data, loading, onEdit, onDelete }) => {
  return (
    <DataTable value={data} paginator rows={10} loading={loading} size="small" scrollable style={TabelAsetStyles.datatable}>
      <Column field="ID" header="ID" />
      <Column field="NAMA_BARANG" header="Nama Barang" />
      <Column field="MERK_TYPE" header="Merk / Type" />
      <Column field="JUMLAH_BARANG" header="Jumlah" />
      <Column field="ASAL_USUL_PEROLEHAN" header="Asal / Usul" />
      <Column field="PERIODE" header="Periode" />
      <Column field="KETERANGAN" header="Keterangan" />
      <Column field="STATUS" header="Status" />
      <Column
        header="Aksi"
        body={(row) => (
          <div className="flex gap-2">
            <Button
              icon="pi pi-pencil"
              size="small"
              severity="warning"
              style={TabelAsetStyles.buttonWarning}
              onMouseEnter={(e) => (e.target.style.backgroundColor = TabelAsetStyles.buttonWarningHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = TabelAsetStyles.buttonWarning.backgroundColor)}
              onClick={() => onEdit(row)}
            />
            <Button
              icon="pi pi-trash"
              size="small"
              severity="danger"
              style={TabelAsetStyles.buttonDanger}
              onMouseEnter={(e) => (e.target.style.backgroundColor = TabelAsetStyles.buttonDangerHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = TabelAsetStyles.buttonDanger.backgroundColor)}
              onClick={() => onDelete(row)}
            />
          </div>
        )}
        style={{ width: "150px" }}
      />
    </DataTable>
  );
};

export default TabelAset;
