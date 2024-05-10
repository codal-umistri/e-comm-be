import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable('order_items');
  if (!tableExists) {
    await knex.schema.createTable('order_items', (table) => {
      table.increments('id').primary();
      table.integer('order_id').unsigned().notNullable();
      table.foreign('order_id').references('id').inTable('order').onDelete('CASCADE');
      table.integer('product_id').unsigned().notNullable();
      table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE');
      table.integer('quantity').unsigned().notNullable();
      table.decimal('unit_price', 10, 2).notNullable(); 
      table.timestamps(true, true);
    });
  } else {
    console.log('Table "order_items" already exists. Skipping creation.');
  }
}

export async function down(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable('order_items');
  if (tableExists) {
    await knex.schema.dropTableIfExists('order_items');
    console.log('Table "order_items" dropped successfully.');
  } else {
    console.log('Table "order_items" does not exist. Skipping drop.');
  }
}
