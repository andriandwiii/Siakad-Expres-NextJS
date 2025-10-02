import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const FormWilayahStyles = {
  dialog: {
    width: "40vw",
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

const FormWilayah = ({ visible, formData, onHide, onChange, onSubmit, errors }) => {
  const inputClass = (field) =>
    errors[field]
      ? { ...FormWilayahStyles.inputText, ...FormWilayahStyles.invalidInput }
      : FormWilayahStyles.inputText;

  return (
    <Dialog
      header={formData.ID ? "Edit Wilayah" : "Tambah Wilayah"}
      visible={visible}
      onHide={onHide}
      style={FormWilayahStyles.dialog}
    >
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {/* Hidden input for ID */}
        <input type="hidden" value={formData.ID} />

        <div>
          <label style={FormWilayahStyles.formLabel}>Provinsi</label>
          <InputText
            style={inputClass("PROVINSI")}
            value={formData.PROVINSI}
            onChange={(e) => onChange({ ...formData, PROVINSI: e.target.value })}
          />
          {errors.PROVINSI && <small style={FormWilayahStyles.errorMessage}>{errors.PROVINSI}</small>}
        </div>

        <div>
          <label style={FormWilayahStyles.formLabel}>Kabupaten</label>
          <InputText
            style={inputClass("KABUPATEN")}
            value={formData.KABUPATEN}
            onChange={(e) => onChange({ ...formData, KABUPATEN: e.target.value })}
          />
          {errors.KABUPATEN && <small style={FormWilayahStyles.errorMessage}>{errors.KABUPATEN}</small>}
        </div>

        {/* Other input fields remain the same */}

        <div className="text-right pt-3">
          <Button
            type="submit"
            label="Simpan"
            icon="pi pi-save"
            style={FormWilayahStyles.submitButton}
            onMouseEnter={(e) => (e.target.style.backgroundColor = FormWilayahStyles.submitButtonHover.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = FormWilayahStyles.submitButton.backgroundColor)}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default FormWilayah;
