import { db } from "../core/config/knex.js"; // Pastikan path knex.js benar

// Ambil semua siswa + data user
export const getAllSiswaWithUser = async () => {
  return db("m_siswa as s")
    .leftJoin("users as u", "s.user_id", "u.id") // ✅ ganti ke u.id
    .select(
      "s.SISWA_ID",
      "s.user_id",
      "s.NIS",
      "s.NISN",
      "s.NAMA",
      "s.GENDER",
      "s.TGL_LAHIR",
      "s.STATUS",
      "s.EMAIL",
      "u.name as user_name",   // ✅ cocok dengan hasil register
      "u.email as user_email",
      "u.role as user_role"
    );
};

// Ambil siswa by ID + data user
export const getSiswaByIdWithUser = async (id) => {
  return db("m_siswa as s")
    .leftJoin("users as u", "s.user_id", "u.id") // ✅ disamakan
    .select(
      "s.SISWA_ID",
      "s.user_id",
      "s.NIS",
      "s.NISN",
      "s.NAMA",
      "s.GENDER",
      "s.TGL_LAHIR",
      "s.STATUS",
      "s.EMAIL",
      "u.name as user_name",
      "u.email as user_email",
      "u.role as user_role"
    )
    .where("s.SISWA_ID", id)
    .first();
};

// Menambahkan siswa baru
export const addSiswa = async ({ user_id, NIS, NISN, NAMA, GENDER, TGL_LAHIR, STATUS, EMAIL }) => {
  const [id] = await db("m_siswa").insert({
    user_id, // relasi ke tabel users
    NIS,
    NISN,
    NAMA,
    GENDER,
    TGL_LAHIR,
    STATUS,
    EMAIL,
  });

  return getSiswaByIdWithUser(id); // supaya langsung return dengan data user
};

// Memperbarui data siswa
export const updateSiswa = async (id, { NIS, NISN, NAMA, GENDER, TGL_LAHIR, STATUS, EMAIL }) => {
  await db("m_siswa").where({ SISWA_ID: id }).update({
    NIS,
    NISN,
    NAMA,
    GENDER,
    TGL_LAHIR,
    STATUS,
    EMAIL,
  });

  return getSiswaByIdWithUser(id); // return data terbaru + user
};

// Hapus siswa
export const deleteSiswa = async (id) => {
  // Cari siswa
  const siswa = await db("m_siswa").where("SISWA_ID", id).first();
  if (!siswa) return null; // kembalikan null jika siswa tidak ada

  // Hapus siswa
  await db("m_siswa").where("SISWA_ID", id).del();

  // Hapus user terkait jika ada
  if (siswa.user_id) {
    const user = await db("users").where("id", siswa.user_id).first();
    if (user) {
      await db("users").where("id", siswa.user_id).del();
    } else {
      console.warn(`User dengan id ${siswa.user_id} tidak ditemukan`);
    }
  }

  return siswa;
};


