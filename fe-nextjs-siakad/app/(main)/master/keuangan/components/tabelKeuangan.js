"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const TabelKeuanganStyles = {
  datatable: {
    backgroundColor: "#f4f4f9",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
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

const TabelKeuangan = ({ data, loading, onEdit, onDelete }) => {
  return (
    <DataTable
      value={data}
      paginator
      rows={10}
      loading={loading}
      size="small"
      scrollable
      style={TabelKeuanganStyles.datatable}
    >
      <Column field="id" header="ID" />
      <Column field="tanggal" header="Tanggal" />
      <Column field="keterangan" header="Keterangan" />
      <Column field="tipe" header="Tipe" />
      <Column
        field="jumlah"
        header="Jumlah"
        body={(row) => `Rp ${row.jumlah.toLocaleString()}`}
      />
      <Column
        header="Aksi"
        body={(row) => (
          <div className="flex gap-2">
            <Button
              icon="pi pi-pencil"
              size="small"
              severity="warning"
              style={TabelKeuanganStyles.buttonWarning}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = TabelKeuanganStyles.buttonWarningHover.backgroundColor)
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = TabelKeuanganStyles.buttonWarning.backgroundColor)
              }
              onClick={() => onEdit(row)}
            />
            <Button
              icon="pi pi-trash"
              size="small"
              severity="danger"
              style={TabelKeuanganStyles.buttonDanger}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = TabelKeuanganStyles.buttonDangerHover.backgroundColor)
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = TabelKeuanganStyles.buttonDanger.backgroundColor)
              }
              onClick={() => onDelete(row)}
            />
          </div>
        )}
        style={{ width: "150px" }}
      />
    </DataTable>
  );
};

export default TabelKeuangan;
