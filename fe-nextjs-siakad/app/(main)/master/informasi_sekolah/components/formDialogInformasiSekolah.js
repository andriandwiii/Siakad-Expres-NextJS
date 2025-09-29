'use client';

import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';  // Import Calendar

// CSS untuk styling form
const FormInformasiSekolahStyles = {
  dialog: {
    width: '30vw',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  formLabel: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
  },
  inputText: {
    width: '100%',
    padding: '8px',
    marginTop: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  invalidInput: {
    borderColor: '#f44336', /* Merah untuk input yang error */
  },
  errorMessage: {
    color: '#f44336',
    fontSize: '12px',
    marginTop: '4px',
  },
  submitButton: {
    marginTop: '16px',
    padding: '8px 16px',
    fontSize: '14px',
    backgroundColor: '#007ad9',
    border: 'none',
    color: '#fff',
    borderRadius: '4px',
    transition: 'all 0.3s ease-in-out',
  },
  submitButtonHover: {
    backgroundColor: '#005bb5',
  },
};

const FormInformasiSekolah = ({
  visible,
  formData,
  onHide,
  onChange,
  onSubmit,
  errors,
}) => {
  const inputClass = (field) =>
    errors[field]
      ? { ...FormInformasiSekolahStyles.inputText, ...FormInformasiSekolahStyles.invalidInput }
      : FormInformasiSekolahStyles.inputText;

  // Opsi untuk dropdown Status
  const statusOptions = [
    { label: 'Aktif', value: 'Aktif' },
    { label: 'Tidak Aktif', value: 'Tidak Aktif' },
  ];

  return (
    <Dialog
      header={formData.ID_SEKOLAH ? 'Edit Informasi Sekolah' : 'Tambah Informasi Sekolah'}
      visible={visible}
      onHide={onHide}
      style={FormInformasiSekolahStyles.dialog}
    >
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div>
          <label style={FormInformasiSekolahStyles.formLabel}>Nama Sekolah</label>
          <InputText
            style={inputClass('NAMA_SEKOLAH')}
            value={formData.NAMA_SEKOLAH}
            onChange={(e) => onChange({ ...formData, NAMA_SEKOLAH: e.target.value })}
          />
          {errors.NAMA_SEKOLAH && <small style={FormInformasiSekolahStyles.errorMessage}>{errors.NAMA_SEKOLAH}</small>}
        </div>

        <div>
          <label style={FormInformasiSekolahStyles.formLabel}>Alamat</label>
          <InputText
            style={inputClass('ALAMAT')}
            value={formData.ALAMAT}
            onChange={(e) => onChange({ ...formData, ALAMAT: e.target.value })}
          />
          {errors.ALAMAT && <small style={FormInformasiSekolahStyles.errorMessage}>{errors.ALAMAT}</small>}
        </div>

        <div>
          <label style={FormInformasiSekolahStyles.formLabel}>Jenjang Akreditasi</label>
          <InputText
            style={inputClass('JENJANG_AKREDITASI')}
            value={formData.JENJANG_AKREDITASI}
            onChange={(e) => onChange({ ...formData, JENJANG_AKREDITASI: e.target.value })}
          />
          {errors.JENJANG_AKREDITASI && <small style={FormInformasiSekolahStyles.errorMessage}>{errors.JENJANG_AKREDITASI}</small>}
        </div>

        <div>
          <label style={FormInformasiSekolahStyles.formLabel}>Tanggal Akreditasi</label>
          <Calendar
            style={inputClass('TANGGAL_AKREDITASI')}
            value={formData.TANGGAL_AKREDITASI}
            onChange={(e) => onChange({ ...formData, TANGGAL_AKREDITASI: e.target.value })}
            dateFormat="yy-mm-dd"  // Format tanggal
            showIcon
          />
          {errors.TANGGAL_AKREDITASI && <small style={FormInformasiSekolahStyles.errorMessage}>{errors.TANGGAL_AKREDITASI}</small>}
        </div>

        <div>
          <label style={FormInformasiSekolahStyles.formLabel}>NPSN</label>
          <InputText
            style={inputClass('NPSN')}
            value={formData.NPSN}
            onChange={(e) => onChange({ ...formData, NPSN: e.target.value })}
          />
          {errors.NPSN && <small style={FormInformasiSekolahStyles.errorMessage}>{errors.NPSN}</small>}
        </div>

        <div>
          <label style={FormInformasiSekolahStyles.formLabel}>Status</label>
          <Dropdown
            value={formData.STATUS}
            options={statusOptions}
            onChange={(e) => onChange({ ...formData, STATUS: e.value })}
            optionLabel="label"
            placeholder="Pilih Status"
            style={inputClass('STATUS')}
          />
          {errors.STATUS && <small style={FormInformasiSekolahStyles.errorMessage}>{errors.STATUS}</small>}
        </div>

        <div className="text-right pt-3">
          <Button
            type="submit"
            label="Simpan"
            icon="pi pi-save"
            style={FormInformasiSekolahStyles.submitButton}
            onMouseEnter={(e) => (e.target.style.backgroundColor = FormInformasiSekolahStyles.submitButtonHover.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = FormInformasiSekolahStyles.submitButton.backgroundColor)}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default FormInformasiSekolah;
