import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('cart', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users');
    table.integer('product_id').unsigned().notNullable();
    table.foreign('product_id').references('id').inTable('products');
    table.integer('quantity').notNullable().defaultTo(1);
    table.timestamps(true, true);


    table.unique(['user_id', 'product_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('cart');
}