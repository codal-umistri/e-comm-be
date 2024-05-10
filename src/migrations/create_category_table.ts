import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable('category');
  if (!tableExists) {
    await knex.schema.createTable('category', (table) => {
      table.increments('id').primary();
      table.string('category_name').notNullable().unique();
      table.timestamps(true, true);
    });
  } else {
    console.log('Table "category" already exists. Skipping creation.');
  }
}

export async function down(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable('category');
  if (tableExists) {
    await knex.schema.dropTableIfExists('category');
    console.log('Table "category" dropped successfully.');
  } else {
    console.log('Table "category" does not exist. Skipping drop.');
  }
}
