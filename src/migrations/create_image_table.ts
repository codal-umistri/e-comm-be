import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('image', (table) => {
    table.increments('id').primary();
    table.integer('product_id').unsigned().notNullable();
    table.foreign('product_id').references('products.id').onDelete('CASCADE');
    table.binary('image_data').notNullable(); 
    table.timestamps(true, true);     
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('image');
}
