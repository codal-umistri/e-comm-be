import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable('otp');
  if (!tableExists) {
    await knex.schema.createTable('otp', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table.string('otp_code').notNullable();
      table.string('otp_hash',).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  } else {
    console.log('Table "otp" already exists. Skipping creation.');
  }
}

export async function down(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable('otp');
  if (tableExists) {
    await knex.schema.dropTableIfExists('otp');
    console.log('Table "otp" dropped successfully.');
  } else {
    console.log('Table "otp" does not exist. Skipping drop.');
  }
}
