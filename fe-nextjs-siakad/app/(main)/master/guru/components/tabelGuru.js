"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const TabelWilayahStyles = {
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

const TabelWilayah = ({ data, loading, onEdit, onDelete }) => {
  return (
    <DataTable value={data} paginator rows={10} loading={loading} size="small" scrollable style={TabelWilayahStyles.datatable}>
      <Column field="ID" header="ID Wilayah" />
      <Column field="PROVINSI" header="Provinsi" />
      <Column field="KABUPATEN" header="Kabupaten" />
      <Column field="KECAMATAN" header="Kecamatan" />
      <Column field="DESA_KELURAHAN" header="Desa/Kelurahan" />
      <Column field="KODEPOS" header="Kode Pos" />
      <Column field="RT" header="RT" />
      <Column field="RW" header="RW" />
      <Column field="JALAN" header="Jalan" />
      <Column field="STATUS" header="Status" />
      <Column
        header="Aksi"
        body={(row) => (
          <div className="flex gap-2">
            <Button
              icon="pi pi-pencil"
              size="small"
              severity="warning"
              style={TabelWilayahStyles.buttonWarning}
              onMouseEnter={(e) => (e.target.style.backgroundColor = TabelWilayahStyles.buttonWarningHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = TabelWilayahStyles.buttonWarning.backgroundColor)}
              onClick={() => onEdit(row)}
            />
            <Button
              icon="pi pi-trash"
              size="small"
              severity="danger"
              style={TabelWilayahStyles.buttonDanger}
              onMouseEnter={(e) => (e.target.style.backgroundColor = TabelWilayahStyles.buttonDangerHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = TabelWilayahStyles.buttonDanger.backgroundColor)}
              onClick={() => onDelete(row)}
            />
          </div>
        )}
        style={{ width: "150px" }}
      />
    </DataTable>
  );
};

export default TabelWilayah;
