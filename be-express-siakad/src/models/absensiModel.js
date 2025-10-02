// models/absensiModel.js
import { db } from "../core/config/knex.js";

const Absensi = {
  async getAll() {
    return db('absensi').orderBy('tanggal', 'desc');
  },

  async getToday(kelas) {
    const today = new Date().toISOString().split('T')[0];
    let query = db('absensi').where('tanggal', today);
    if (kelas) query = query.andWhere('kelas', kelas);
    return query;
  },

  async create(data) {
    const [id] = await db('absensi').insert(data);
    return db('absensi').where('id', id).first();
  },

  async delete(id) {
    return db('absensi').where('id', id).del();
  }
};

module.exports = Absensi;
