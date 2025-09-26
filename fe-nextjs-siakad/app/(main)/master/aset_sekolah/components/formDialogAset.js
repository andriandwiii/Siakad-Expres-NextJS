"use client";

import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const FormAsetStyles = {
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

const FormAset = ({ visible, formData, onHide, onChange, onSubmit, errors }) => {
  const inputClass = (field) =>
    errors[field]
      ? { ...FormAsetStyles.inputText, ...FormAsetStyles.invalidInput }
      : FormAsetStyles.inputText;

  const statusOptions = [
    { label: "Aktif", value: "Aktif" },
    { label: "Tidak Aktif", value: "Tidak Aktif" },
  ];

  return (
    <Dialog
      header={formData.ID ? "Edit Aset Sekolah" : "Tambah Aset Sekolah"}
      visible={visible}
      onHide={onHide}
      style={FormAsetStyles.dialog}
    >
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div>
          <label style={FormAsetStyles.formLabel}>Nama Barang</label>
          <InputText
            style={inputClass("NAMA_BARANG")}
            value={formData.NAMA_BARANG}
            onChange={(e) => onChange({ ...formData, NAMA_BARANG: e.target.value })}
          />
          {errors.NAMA_BARANG && <small style={FormAsetStyles.errorMessage}>{errors.NAMA_BARANG}</small>}
        </div>

        <div>
          <label style={FormAsetStyles.formLabel}>Merk / Type</label>
          <InputText
            style={inputClass("MERK_TYPE")}
            value={formData.MERK_TYPE}
            onChange={(e) => onChange({ ...formData, MERK_TYPE: e.target.value })}
          />
        </div>

        <div>
          <label style={FormAsetStyles.formLabel}>Jumlah Barang</label>
          <InputText
            type="number"
            style={inputClass("JUMLAH_BARANG")}
            value={formData.JUMLAH_BARANG}
            onChange={(e) => onChange({ ...formData, JUMLAH_BARANG: e.target.value })}
          />
          {errors.JUMLAH_BARANG && <small style={FormAsetStyles.errorMessage}>{errors.JUMLAH_BARANG}</small>}
        </div>

        <div>
          <label style={FormAsetStyles.formLabel}>Asal / Usul Perolehan</label>
          <InputText
            style={inputClass("ASAL_USUL_PEROLEHAN")}
            value={formData.ASAL_USUL_PEROLEHAN}
            onChange={(e) => onChange({ ...formData, ASAL_USUL_PEROLEHAN: e.target.value })}
          />
        </div>

        <div>
          <label style={FormAsetStyles.formLabel}>Periode</label>
          <InputText
            style={inputClass("PERIODE")}
            value={formData.PERIODE}
            onChange={(e) => onChange({ ...formData, PERIODE: e.target.value })}
          />
        </div>

        <div>
          <label style={FormAsetStyles.formLabel}>Keterangan</label>
          <InputText
            style={inputClass("KETERANGAN")}
            value={formData.KETERANGAN}
            onChange={(e) => onChange({ ...formData, KETERANGAN: e.target.value })}
          />
        </div>

        <div>
          <label style={FormAsetStyles.formLabel}>Status</label>
          <Dropdown
            value={formData.STATUS}
            options={statusOptions}
            onChange={(e) => onChange({ ...formData, STATUS: e.value })}
            optionLabel="label"
            placeholder="Pilih Status"
            style={inputClass("STATUS")}
          />
          {errors.STATUS && <small style={FormAsetStyles.errorMessage}>{errors.STATUS}</small>}
        </div>

        <div className="text-right pt-3">
          <Button
            type="submit"
            label="Simpan"
            icon="pi pi-save"
            style={FormAsetStyles.submitButton}
            onMouseEnter={(e) => (e.target.style.backgroundColor = FormAsetStyles.submitButtonHover.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = FormAsetStyles.submitButton.backgroundColor)}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default FormAset;
