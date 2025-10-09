import { db } from "../core/config/knex.js";

const KelasTable = "m_kelas";

// Ambil semua kelas beserta nama jurusan dan gedung (join)
export const getAllKelas = async () => {
  return db(KelasTable)
    .select(
      "m_kelas.KELAS_ID",
      "m_kelas.NAMA_KELAS",
      "m_kelas.TINGKATAN",
      "m_kelas.JURUSAN_ID",
      "master_jurusan.NAMA_JURUSAN",
      "m_kelas.GEDUNG_ID",
      "master_gedung.NAMA_GEDUNG",
      "m_kelas.created_at",
      "m_kelas.updated_at"
    )
    .leftJoin("master_jurusan", "m_kelas.JURUSAN_ID", "master_jurusan.JURUSAN_ID")
    .leftJoin("master_gedung", "m_kelas.GEDUNG_ID", "master_gedung.GEDUNG_ID")
    .orderBy("m_kelas.KELAS_ID", "asc");
};

// Ambil kelas berdasarkan ID
export const getKelasById = async (id) => {
  return db(KelasTable)
    .select(
      "m_kelas.KELAS_ID",
      "m_kelas.NAMA_KELAS",
      "m_kelas.TINGKATAN",
      "m_kelas.JURUSAN_ID",
      "master_jurusan.NAMA_JURUSAN",
      "m_kelas.GEDUNG_ID",
      "master_gedung.NAMA_GEDUNG",
      "m_kelas.created_at",
      "m_kelas.updated_at"
    )
    .leftJoin("master_jurusan", "m_kelas.JURUSAN_ID", "master_jurusan.JURUSAN_ID")
    .leftJoin("master_gedung", "m_kelas.GEDUNG_ID", "master_gedung.GEDUNG_ID")
    .where("m_kelas.KELAS_ID", id)
    .first();
};

// Buat kelas baru
export const createKelas = async (data) => {
  const [id] = await db(KelasTable).insert({
    NAMA_KELAS: data.NAMA_KELAS,
    JURUSAN_ID: data.JURUSAN_ID,
    GEDUNG_ID: data.GEDUNG_ID,
    TINGKATAN: data.TINGKATAN,
  });
  return getKelasById(id);
};

// Update kelas
export const updateKelas = async (id, data) => {
  const result = await db(KelasTable)
    .where({ KELAS_ID: id })
    .update({
      NAMA_KELAS: data.NAMA_KELAS,
      JURUSAN_ID: data.JURUSAN_ID,
      GEDUNG_ID: data.GEDUNG_ID,
      TINGKATAN: data.TINGKATAN,
      updated_at: db.fn.now(),
    });

  if (result) return getKelasById(id);
  return null;
};

// Hapus kelas
export const deleteKelas = async (id) => {
  const kelas = await getKelasById(id);
  if (!kelas) return null;

  await db(KelasTable).where({ KELAS_ID: id }).del();
  return kelas;
};
