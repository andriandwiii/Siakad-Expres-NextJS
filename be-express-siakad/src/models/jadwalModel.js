import { db } from "../core/config/knex.js";

const table = "t_jadwal";

// ✅ Ambil semua jadwal dengan relasi lengkap
export const getAllJadwal = async () => {
  const rows = await db(table)
    .select(
      "t_jadwal.*",
      "m_kelas.NAMA_KELAS",
      "m_kelas.TINGKATAN",
      "master_jurusan.NAMA_JURUSAN",
      "master_mata_pelajaran.NAMA_MAPEL",
      "t_mapel_kelas.KODE_MAPEL",
      "m_guru.NAMA as NAMA_GURU",   // ✅ fix alias
      "master_hari.NAMA_HARI"
    )
    .leftJoin("m_kelas", "t_jadwal.KELAS_ID", "m_kelas.KELAS_ID")
    .leftJoin("master_jurusan", "m_kelas.JURUSAN_ID", "master_jurusan.JURUSAN_ID")
    .leftJoin("t_mapel_kelas", "t_jadwal.MAPEL_KELAS_ID", "t_mapel_kelas.MAPEL_KELAS_ID")
    .leftJoin("master_mata_pelajaran", "t_mapel_kelas.MAPEL_ID", "master_mata_pelajaran.MAPEL_ID")
    .leftJoin("m_guru", "t_mapel_kelas.GURU_ID", "m_guru.GURU_ID")
    .leftJoin("master_hari", "t_jadwal.HARI_ID", "master_hari.HARI_ID")
    .orderBy("t_jadwal.JADWAL_ID", "desc");

  return rows.map((r) => ({
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
      NAMA_GURU: r.NAMA_GURU,
    },
    hari: {
      NAMA_HARI: r.NAMA_HARI,
    },
  }));
};

// ✅ Tambah jadwal
export const createJadwal = async (data) => {
  const [id] = await db(table).insert(data);
  return getJadwalById(id);
};

// ✅ Update jadwal
export const updateJadwal = async (id, data) => {
  const cek = await db(table).where({ JADWAL_ID: id }).first();
  if (!cek) return null;
  await db(table).where({ JADWAL_ID: id }).update(data);
  return getJadwalById(id);
};

// ✅ Ambil satu jadwal
export const getJadwalById = async (id) => {
  return db(table)
    .select(
      "t_jadwal.*",
      "m_kelas.NAMA_KELAS",
      "m_kelas.TINGKATAN",
      "master_jurusan.NAMA_JURUSAN",
      "master_mata_pelajaran.NAMA_MAPEL",
      "t_mapel_kelas.KODE_MAPEL",
      "m_guru.NAMA as NAMA_GURU",   // ✅ fix alias
      "master_hari.NAMA_HARI"
    )
    .leftJoin("m_kelas", "t_jadwal.KELAS_ID", "m_kelas.KELAS_ID")
    .leftJoin("master_jurusan", "m_kelas.JURUSAN_ID", "master_jurusan.JURUSAN_ID")
    .leftJoin("t_mapel_kelas", "t_jadwal.MAPEL_KELAS_ID", "t_mapel_kelas.MAPEL_KELAS_ID")
    .leftJoin("master_mata_pelajaran", "t_mapel_kelas.MAPEL_ID", "master_mata_pelajaran.MAPEL_ID")
    .leftJoin("m_guru", "t_mapel_kelas.GURU_ID", "m_guru.GURU_ID")
    .leftJoin("master_hari", "t_jadwal.HARI_ID", "master_hari.HARI_ID")
    .where("t_jadwal.JADWAL_ID", id)
    .first();
};

// ✅ Hapus jadwal
export const deleteJadwal = async (id) => {
  const cek = await db(table).where({ JADWAL_ID: id }).first();
  if (!cek) return null;
  await db(table).where({ JADWAL_ID: id }).del();
  return cek;
};
