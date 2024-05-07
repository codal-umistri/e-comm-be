import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable('cart');
  if (!tableExists) {
    await knex.schema.createTable('cart', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.integer('product_id').unsigned().notNullable();
      table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE');
      table.integer('quantity').notNullable().defaultTo(1);
      table.timestamps(true, true);
      table.unique(['user_id', 'product_id']);
    });
  } else {
    console.log('Table "cart" already exists. Skipping creation.');
  }
}

export async function down(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable('cart');
  if (tableExists) {
    await knex.schema.dropTableIfExists('cart');
    console.log('Table "cart" dropped successfully.');
  } else {
    console.log('Table "cart" does not exist. Skipping drop.');
  }
}
