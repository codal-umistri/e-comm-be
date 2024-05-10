import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable('image');
  if (!tableExists) {
    await knex.schema.createTable('image', (table) => {
      table.increments('id').primary();
      table.integer('product_id').unsigned().notNullable();
      table.foreign('product_id').references('products.id').onDelete('CASCADE');
      table.text('image_data').notNullable();
      table.timestamps(true, true);
    });
  } else {
    console.log('Table "image" already exists. Skipping creation.');
  }
}

export async function down(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable('image');
  if (tableExists) {
    await knex.schema.dropTableIfExists('image');
    console.log('Table "image" dropped successfully.');
  } else {
    console.log('Table "image" does not exist. Skipping drop.');
  }
}
