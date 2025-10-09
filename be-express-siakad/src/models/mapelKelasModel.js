import { db } from "../core/config/knex.js";

const table = "t_mapel_kelas";

// Helper untuk format row biar konsisten
const formatRow = (r) => ({
  ...r,
  kelas: {
    NAMA_KELAS: r.NAMA_KELAS,
    TINGKATAN: r.TINGKATAN,
    NAMA_JURUSAN: r.NAMA_JURUSAN,
  },
  mapel: {
    MAPEL_ID: r.MAPEL_ID,
    NAMA_MAPEL: r.NAMA_MAPEL,
    KODE_MAPEL: r.KODE_MAPEL,
  },
  guru: {
    GURU_ID: r.GURU_ID,
    NAMA_GURU: r.NAMA_GURU,
    GELAR_DEPAN: r.GELAR_DEPAN,
    GELAR_BELAKANG: r.GELAR_BELAKANG
  },
});


// Query join
const baseQuery = () =>
  db(table)
    .select(
      "t_mapel_kelas.*",
      "m_kelas.NAMA_KELAS",
      "m_kelas.TINGKATAN",
      "master_jurusan.NAMA_JURUSAN",
      "master_mata_pelajaran.NAMA_MAPEL",
      "m_guru.NAMA as NAMA_GURU",
      "m_guru.GELAR_DEPAN",
      "m_guru.GELAR_BELAKANG"
    )
    .leftJoin("m_kelas", "t_mapel_kelas.KELAS_ID", "m_kelas.KELAS_ID")
    .leftJoin("master_jurusan", "m_kelas.JURUSAN_ID", "master_jurusan.JURUSAN_ID")
    .leftJoin("master_mata_pelajaran", "t_mapel_kelas.MAPEL_ID", "master_mata_pelajaran.MAPEL_ID")
    .leftJoin("m_guru", "t_mapel_kelas.GURU_ID", "m_guru.GURU_ID");


// ✅ Ambil semua relasi mapel-kelas
export const getAllMapelKelas = async () => {
  const rows = await baseQuery().orderBy("t_mapel_kelas.MAPEL_KELAS_ID", "desc");
  return rows.map(formatRow);
};

// ✅ Tambah relasi + ambil data lengkap
export const createMapelKelas = async (data) => {
  const [id] = await db(table).insert(data);
  const row = await baseQuery()
    .where("t_mapel_kelas.MAPEL_KELAS_ID", id)
    .first();
  return formatRow(row);
};

// ✅ Update relasi + ambil data lengkap
export const updateMapelKelas = async (id, data) => {
  const relasi = await db(table).where({ MAPEL_KELAS_ID: id }).first();
  if (!relasi) return null;
  await db(table).where({ MAPEL_KELAS_ID: id }).update(data);
  const row = await baseQuery()
    .where("t_mapel_kelas.MAPEL_KELAS_ID", id)
    .first();
  return formatRow(row);
};

// ✅ Ambil satu relasi by ID
export const getMapelKelasById = async (id) => {
  const row = await baseQuery()
    .where("t_mapel_kelas.MAPEL_KELAS_ID", id)
    .first();
  return row ? formatRow(row) : null;
};

// ✅ Hapus relasi
export const deleteMapelKelas = async (id) => {
  const relasi = await db(table).where({ MAPEL_KELAS_ID: id }).first();
  if (!relasi) return null;
  await db(table).where({ MAPEL_KELAS_ID: id }).del();
  return relasi;
};
