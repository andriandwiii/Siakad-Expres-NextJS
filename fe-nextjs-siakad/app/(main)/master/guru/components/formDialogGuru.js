"use client";

import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const FormGuruStyles = {
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

const FormGuru = ({ visible, formData, onHide, onChange, onSubmit, errors }) => {
  const inputClass = (field) =>
    errors[field]
      ? { ...FormGuruStyles.inputText, ...FormGuruStyles.invalidInput }
      : FormGuruStyles.inputText;

  return (
    <Dialog
      header={formData.GURU_ID ? "Edit Guru" : "Tambah Guru"}
      visible={visible}
      onHide={onHide}
      style={FormGuruStyles.dialog}
    >
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div>
          <label style={FormGuruStyles.formLabel}>NIP</label>
          <InputText
            style={inputClass("NIP")}
            value={formData.NIP}
            onChange={(e) => onChange({ ...formData, NIP: e.target.value })}
          />
          {errors.NIP && <small style={FormGuruStyles.errorMessage}>{errors.NIP}</small>}
        </div>

        <div>
          <label style={FormGuruStyles.formLabel}>Nama</label>
          <InputText
            style={inputClass("NAMA")}
            value={formData.NAMA}
            onChange={(e) => onChange({ ...formData, NAMA: e.target.value })}
          />
          {errors.NAMA && <small style={FormGuruStyles.errorMessage}>{errors.NAMA}</small>}
        </div>

        <div>
          <label style={FormGuruStyles.formLabel}>Gelar</label>
          <InputText
            style={inputClass("GELAR")}
            value={formData.GELAR}
            onChange={(e) => onChange({ ...formData, GELAR: e.target.value })}
          />
          {errors.GELAR && <small style={FormGuruStyles.errorMessage}>{errors.GELAR}</small>}
        </div>

        <div>
          <label style={FormGuruStyles.formLabel}>Pangkat</label>
          <InputText
            style={inputClass("PANGKAT")}
            value={formData.PANGKAT}
            onChange={(e) => onChange({ ...formData, PANGKAT: e.target.value })}
          />
          {errors.PANGKAT && <small style={FormGuruStyles.errorMessage}>{errors.PANGKAT}</small>}
        </div>

        <div>
          <label style={FormGuruStyles.formLabel}>Jabatan</label>
          <InputText
            style={inputClass("JABATAN")}
            value={formData.JABATAN}
            onChange={(e) => onChange({ ...formData, JABATAN: e.target.value })}
          />
          {errors.JABATAN && <small style={FormGuruStyles.errorMessage}>{errors.JABATAN}</small>}
        </div>

        <div className="text-right pt-3">
          <Button
            type="submit"
            label="Simpan"
            icon="pi pi-save"
            style={FormGuruStyles.submitButton}
            onMouseEnter={(e) => (e.target.style.backgroundColor = FormGuruStyles.submitButtonHover.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = FormGuruStyles.submitButton.backgroundColor)}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default FormGuru;
