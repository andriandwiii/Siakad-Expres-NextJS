// migration file: <timestamp>_create_master_wilayah.js

export const up = function(knex) {
  return knex.schema.createTable('master_wilayah', (table) => {
    table.increments('id').primary(); 
    table.string('PROVINSI').notNullable();
    table.string('KABUPATEN').notNullable();
    table.string('KECAMATAN').notNullable();
    table.string('DESA_KELURAHAN').notNullable();
    table.string('KODEPOS').notNullable();
    table.string('RT').notNullable();
    table.string('RW').notNullable();
    table.string('JALAN').notNullable();
    table.string('STATUS').defaultTo('Aktif');
    table.timestamps(true, true);
  });
};

export const down = function(knex) {
  return knex.schema.dropTableIfExists('master_wilayah');
};
