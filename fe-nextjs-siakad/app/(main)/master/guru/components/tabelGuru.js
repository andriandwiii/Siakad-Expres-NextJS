"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const TabelGuruStyles = {
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
  columnHeader: {
    fontSize: "16px",
  },
  columnHeaderContent: {
    color: "#ffffff",
  },
  rowHover: {
    backgroundColor: "#e0f7fa",
  },
  cell: {
    padding: "10px",
  },
  button: {
    transition: "all 0.3s ease-in-out",
  },
  buttonHover: {
    transform: "scale(1.05)",
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
  responsive: {
    "@media (max-width: 768px)": {
      fontSize: "14px",
    },
  },
};

const TabelGuru = ({ data, loading, onEdit, onDelete }) => {
  return (
    <DataTable value={data} paginator rows={10} loading={loading} size="small" scrollable style={TabelGuruStyles.datatable}>
      <Column field="GURU_ID" header="ID Guru" />
      <Column field="NIP" header="NIP" />
      <Column field="NAMA" header="Nama" />
      <Column field="GELAR" header="Gelar" />
      <Column field="PANGKAT" header="Pangkat" />
      <Column field="JABATAN" header="Jabatan" />
      <Column
        header="Aksi"
        body={(row) => (
          <div className="flex gap-2">
            <Button
              icon="pi pi-pencil"
              size="small"
              severity="warning"
              style={TabelGuruStyles.buttonWarning}
              onMouseEnter={(e) => (e.target.style.backgroundColor = TabelGuruStyles.buttonWarningHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = TabelGuruStyles.buttonWarning.backgroundColor)}
              onClick={() => onEdit(row)}
            />
            <Button
              icon="pi pi-trash"
              size="small"
              severity="danger"
              style={TabelGuruStyles.buttonDanger}
              onMouseEnter={(e) => (e.target.style.backgroundColor = TabelGuruStyles.buttonDangerHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = TabelGuruStyles.buttonDanger.backgroundColor)}
              onClick={() => onDelete(row)}
            />
          </div>
        )}
        style={{ width: "150px" }}
      />
    </DataTable>
  );
};

export default TabelGuru;
