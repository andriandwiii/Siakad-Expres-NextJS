"use client";

import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const FormMapelStyles = {
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

const FormMapel = ({ visible, formData, onHide, onChange, onSubmit, errors }) => {
  const inputClass = (field) =>
    errors[field]
      ? { ...FormMapelStyles.inputText, ...FormMapelStyles.invalidInput }
      : FormMapelStyles.inputText;

  const statusOptions = [
    { label: "Aktif", value: "Aktif" },
    { label: "Tidak Aktif", value: "Tidak Aktif" },
  ];

  const kategoriOptions = [
    { label: "Umum", value: "Umum" },
    { label: "Wajib", value: "Wajib" },
    { label: "Pilihan", value: "Pilihan" },
  ];

  return (
    <Dialog
      header={formData.MAPEL_ID ? "Edit Mata Pelajaran" : "Tambah Mata Pelajaran"}
      visible={visible}
      onHide={onHide}
      style={FormMapelStyles.dialog}
    >
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div>
          <label style={FormMapelStyles.formLabel}>Kode Mapel</label>
          <InputText
            style={inputClass("KODE_MAPEL")}
            value={formData.KODE_MAPEL}
            onChange={(e) => onChange({ ...formData, KODE_MAPEL: e.target.value })}
          />
          {errors.KODE_MAPEL && <small style={FormMapelStyles.errorMessage}>{errors.KODE_MAPEL}</small>}
        </div>

        <div>
          <label style={FormMapelStyles.formLabel}>Nama Mapel</label>
          <InputText
            style={inputClass("NAMA_MAPEL")}
            value={formData.NAMA_MAPEL}
            onChange={(e) => onChange({ ...formData, NAMA_MAPEL: e.target.value })}
          />
          {errors.NAMA_MAPEL && <small style={FormMapelStyles.errorMessage}>{errors.NAMA_MAPEL}</small>}
        </div>

        <div>
          <label style={FormMapelStyles.formLabel}>Deskripsi</label>
          <InputText
            style={inputClass("DESKRIPSI")}
            value={formData.DESKRIPSI}
            onChange={(e) => onChange({ ...formData, DESKRIPSI: e.target.value })}
          />
          {errors.DESKRIPSI && <small style={FormMapelStyles.errorMessage}>{errors.DESKRIPSI}</small>}
        </div>

        <div>
          <label style={FormMapelStyles.formLabel}>Kategori</label>
          <Dropdown
            value={formData.KATEGORI}
            options={kategoriOptions}
            onChange={(e) => onChange({ ...formData, KATEGORI: e.value })}
            placeholder="Pilih Kategori"
            style={inputClass("KATEGORI")}
          />
          {errors.KATEGORI && <small style={FormMapelStyles.errorMessage}>{errors.KATEGORI}</small>}
        </div>

        <div>
          <label style={FormMapelStyles.formLabel}>Status</label>
          <Dropdown
            value={formData.STATUS}
            options={statusOptions}
            onChange={(e) => onChange({ ...formData, STATUS: e.value })}
            placeholder="Pilih Status"
            style={inputClass("STATUS")}
          />
          {errors.STATUS && <small style={FormMapelStyles.errorMessage}>{errors.STATUS}</small>}
        </div>

        <div className="text-right pt-3">
          <Button
            type="submit"
            label="Simpan"
            icon="pi pi-save"
            style={FormMapelStyles.submitButton}
            onMouseEnter={(e) => (e.target.style.backgroundColor = FormMapelStyles.submitButtonHover.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = FormMapelStyles.submitButton.backgroundColor)}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default FormMapel;
