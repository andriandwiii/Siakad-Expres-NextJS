"use client";

import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

const FormKeuanganStyles = {
  dialog: {
    width: "30vw",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  formLabel: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
  },
  inputText: {
    width: "100%",
    padding: "8px",
    marginTop: "8px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  invalidInput: {
    borderColor: "#f44336",
  },
  errorMessage: {
    color: "#f44336",
    fontSize: "12px",
    marginTop: "4px",
  },
  submitButton: {
    marginTop: "16px",
    padding: "8px 16px",
    fontSize: "14px",
    backgroundColor: "#007ad9",
    border: "none",
    color: "#fff",
    borderRadius: "4px",
    transition: "all 0.3s ease-in-out",
  },
  submitButtonHover: {
    backgroundColor: "#005bb5",
  },
};

const FormKeuangan = ({ visible, formData, onHide, onChange, onSubmit, errors }) => {
  const inputClass = (field) =>
    errors[field]
      ? { ...FormKeuanganStyles.inputText, ...FormKeuanganStyles.invalidInput }
      : FormKeuanganStyles.inputText;

  const tipeOptions = [
    { label: "Pemasukan", value: "PEMASUKAN" },
    { label: "Pengeluaran", value: "PENGELUARAN" },
  ];

  return (
    <Dialog
      header={formData.id ? "Edit Data Keuangan" : "Tambah Data Keuangan"}
      visible={visible}
      onHide={onHide}
      style={FormKeuanganStyles.dialog}
    >
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div>
          <label style={FormKeuanganStyles.formLabel}>Tanggal</label>
          <Calendar
            dateFormat="yy-mm-dd"
            value={formData.tanggal ? new Date(formData.tanggal) : null}
            onChange={(e) =>
              onChange({ ...formData, tanggal: e.value ? e.value.toISOString().split("T")[0] : "" })
            }
            style={inputClass("tanggal")}
          />
          {errors.tanggal && <small style={FormKeuanganStyles.errorMessage}>{errors.tanggal}</small>}
        </div>

        <div>
          <label style={FormKeuanganStyles.formLabel}>Keterangan</label>
          <InputText
            style={inputClass("keterangan")}
            value={formData.keterangan}
            onChange={(e) => onChange({ ...formData, keterangan: e.target.value })}
          />
          {errors.keterangan && <small style={FormKeuanganStyles.errorMessage}>{errors.keterangan}</small>}
        </div>

        <div>
          <label style={FormKeuanganStyles.formLabel}>Tipe</label>
          <Dropdown
            value={formData.tipe}
            options={tipeOptions}
            onChange={(e) => onChange({ ...formData, tipe: e.value })}
            optionLabel="label"
            placeholder="Pilih Tipe"
            style={inputClass("tipe")}
          />
          {errors.tipe && <small style={FormKeuanganStyles.errorMessage}>{errors.tipe}</small>}
        </div>

        <div>
          <label style={FormKeuanganStyles.formLabel}>Jumlah (Rp)</label>
          <InputText
            type="number"
            style={inputClass("jumlah")}
            value={formData.jumlah}
            onChange={(e) => onChange({ ...formData, jumlah: parseInt(e.target.value, 10) || 0 })}
          />
          {errors.jumlah && <small style={FormKeuanganStyles.errorMessage}>{errors.jumlah}</small>}
        </div>

        <div className="text-right pt-3">
          <Button
            type="submit"
            label="Simpan"
            icon="pi pi-save"
            style={FormKeuanganStyles.submitButton}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = FormKeuanganStyles.submitButtonHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = FormKeuanganStyles.submitButton.backgroundColor)
            }
          />
        </div>
      </form>
    </Dialog>
  );
};

export default FormKeuangan;
