"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const TabelMapelStyles = {
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
};

const TabelMapel = ({ data, loading, onEdit, onDelete }) => {
  return (
    <DataTable
      value={data}
      paginator
      rows={10}
      loading={loading}
      size="small"
      scrollable
      style={TabelMapelStyles.datatable}
    >
      <Column field="MAPEL_ID" header="ID Mapel" />
      <Column field="KODE_MAPEL" header="Kode Mapel" />
      <Column field="NAMA_MAPEL" header="Nama Mapel" />
      <Column field="DESKRIPSI" header="Deskripsi" />
      <Column field="KATEGORI" header="Kategori" />
      <Column field="STATUS" header="Status" />
      <Column
        header="Aksi"
        body={(row) => (
          <div className="flex gap-2">
            <Button
              icon="pi pi-pencil"
              size="small"
              severity="warning"
              style={TabelMapelStyles.buttonWarning}
              onMouseEnter={(e) => (e.target.style.backgroundColor = TabelMapelStyles.buttonWarningHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = TabelMapelStyles.buttonWarning.backgroundColor)}
              onClick={() => onEdit(row)}
            />
            <Button
              icon="pi pi-trash"
              size="small"
              severity="danger"
              style={TabelMapelStyles.buttonDanger}
              onMouseEnter={(e) => (e.target.style.backgroundColor = TabelMapelStyles.buttonDangerHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = TabelMapelStyles.buttonDanger.backgroundColor)}
              onClick={() => onDelete(row)}
            />
          </div>
        )}
        style={{ width: "150px" }}
      />
    </DataTable>
  );
};

export default TabelMapel;
