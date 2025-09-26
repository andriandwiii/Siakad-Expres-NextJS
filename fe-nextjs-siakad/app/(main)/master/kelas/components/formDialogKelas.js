"use client";

import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

// CSS untuk styling form
const FormKelasStyles = {
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
    borderColor: "#f44336", /* Merah untuk input yang error */
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

const FormKelas = ({ visible, formData, onHide, onChange, onSubmit, errors }) => {
  const inputClass = (field) =>
    errors[field]
      ? { ...FormKelasStyles.inputText, ...FormKelasStyles.invalidInput }
      : FormKelasStyles.inputText;

  // Opsi untuk dropdown Status
  const statusOptions = [
    { label: "Aktif", value: "Aktif" },
    { label: "Tidak Aktif", value: "Tidak Aktif" },
  ];

  return (
    <Dialog
      header={formData.KELAS_ID ? "Edit Kelas" : "Tambah Kelas"}
      visible={visible}
      onHide={onHide}
      style={FormKelasStyles.dialog}
    >
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div>
          <label style={FormKelasStyles.formLabel}>Kode Kelas</label>
          <InputText
            style={inputClass("KODE_KELAS")}
            value={formData.KODE_KELAS}
            onChange={(e) => onChange({ ...formData, KODE_KELAS: e.target.value })}
          />
          {errors.KODE_KELAS && <small style={FormKelasStyles.errorMessage}>{errors.KODE_KELAS}</small>}
        </div>

        <div>
          <label style={FormKelasStyles.formLabel}>Tingkat</label>
          <InputText
            style={inputClass("TINGKAT")}
            value={formData.TINGKAT}
            onChange={(e) => onChange({ ...formData, TINGKAT: e.target.value })}
          />
          {errors.TINGKAT && <small style={FormKelasStyles.errorMessage}>{errors.TINGKAT}</small>}
        </div>

        <div>
          <label style={FormKelasStyles.formLabel}>Jurusan</label>
          <InputText
            style={inputClass("JURUSAN")}
            value={formData.JURUSAN}
            onChange={(e) => onChange({ ...formData, JURUSAN: e.target.value })}
          />
          {errors.JURUSAN && <small style={FormKelasStyles.errorMessage}>{errors.JURUSAN}</small>}
        </div>

        <div>
          <label style={FormKelasStyles.formLabel}>Nama Kelas</label>
          <InputText
            style={inputClass("NAMA_KELAS")}
            value={formData.NAMA_KELAS}
            onChange={(e) => onChange({ ...formData, NAMA_KELAS: e.target.value })}
          />
          {errors.NAMA_KELAS && <small style={FormKelasStyles.errorMessage}>{errors.NAMA_KELAS}</small>}
        </div>

        <div>
          <label style={FormKelasStyles.formLabel}>Status</label>
          <Dropdown
            value={formData.STATUS}
            options={statusOptions}
            onChange={(e) => onChange({ ...formData, STATUS: e.value })}
            optionLabel="label"
            placeholder="Pilih Status"
            style={inputClass("STATUS")}
          />
          {errors.STATUS && <small style={FormKelasStyles.errorMessage}>{errors.STATUS}</small>}
        </div>

        <div className="text-right pt-3">
          <Button
            type="submit"
            label="Simpan"
            icon="pi pi-save"
            style={FormKelasStyles.submitButton}
            onMouseEnter={(e) => (e.target.style.backgroundColor = FormKelasStyles.submitButtonHover.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = FormKelasStyles.submitButton.backgroundColor)}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default FormKelas;
