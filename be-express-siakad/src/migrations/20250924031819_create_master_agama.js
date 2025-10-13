

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
<<<<<<< HEAD
export async function up(knex) {
  return knex.schema.createTable('master_agama', function(table) {
    table.increments('IDAGAMA').primary(); // Primary Key, Auto Increment
=======
module.export.up = function(knex) {
  return knex.schema.createTable('master_agama', function(table) {
    table.increments('id').primary(); // Primary Key, Auto Increment
>>>>>>> a5a98e93e47eb2320681828aa954a5a0c8bddb3f
    table.string('NAMAAGAMA', 100).notNullable(); // Nama agama
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Tanggal dibuat
    table.timestamp('updated_at').defaultTo(knex.fn.now()); // Tanggal diupdate
  });
};
export async function down(knex) {
  return knex.schema.dropTableIfExists("master_agama");
}

<<<<<<< HEAD
=======
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.export.down = function(knex) {
  return knex.schema.dropTableIfExists('master_agama');  // Menghapus tabel jika rollback
};
>>>>>>> a5a98e93e47eb2320681828aa954a5a0c8bddb3f
