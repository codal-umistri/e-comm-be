import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable('order');
  if (!tableExists) {
    await knex.schema.createTable('order', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.enum('payment_status', ['pending', 'success', 'failed']).notNullable().defaultTo('pending');
      table.string('session_id');
      table.string('shipping_city');
      table.string('shipping_country');
      table.string('address_line1');
      table.string('address_line2');
      table.timestamps(true, true);
    });
  } else {
    console.log('Table "order" already exists. Skipping creation.');
  }
}

export async function down(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable('order');
  if (tableExists) {
    await knex.schema.dropTableIfExists('order');
    console.log('Table "order" dropped successfully.');
  } else {
    console.log('Table "order" does not exist. Skipping drop.');
  }
}
