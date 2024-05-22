import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable('users');
  if (!tableExists) {
    await knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('first_name', 100);
      table.string('last_name', 100);
      table.enum('gender', ['Male', 'Female', 'Other']);
      table.string('email', 255).notNullable().unique();
      table.string('password', 255).notNullable();
      table.integer('type').defaultTo(1);
      table.timestamps(true, true);
    });
  } else {
    console.log('Table "users" already exists. Skipping creation.');
  }
}

export async function down(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable('users');
  if (tableExists) {
    await knex.schema.dropTableIfExists('users');
    console.log('Table "users" dropped successfully.');
  } else {
    console.log('Table "users" does not exist. Skipping drop.');
  }
}
