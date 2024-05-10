import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable('products');
  if (!tableExists) {
    await knex.schema.createTable('products', (table) => {
      table.increments('id').primary();
      table.integer('category_id').unsigned();
      table
        .foreign('category_id')
        .references('category.id')
        .onDelete('SET NULL');
      table.string('description').notNullable();
      table.float('discountPercentage').notNullable().unsigned();
      table.float('price').notNullable().unsigned();
      table.float('rating').notNullable().unsigned();
      table.float('stock').notNullable().unsigned();
      table.string('brand').notNullable();
      table.string('title').notNullable();
      table.timestamps(true, true);
    });
  } else {
    console.log('Table "products" already exists. Skipping creation.');
  }
}

export async function down(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable('products');
  if (tableExists) {
    await knex.schema.dropTableIfExists('products');
    console.log('Table "products" dropped successfully.');
  } else {
    console.log('Table "products" does not exist. Skipping drop.');
  }
}
