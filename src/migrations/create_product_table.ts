import Knex from 'knex';

export async function up(knex:Knex):Promise<void>
{
  await knex.schema.createTable('products',(table)=>
  {
    table.increments('id').primary();
    table.integer('category_id').unsigned();
    table.foreign('category_id').references('category.id').onDelete('SET NULL');
    table.string('description').notNullable();
    table.float('discountPercentage').notNullable().unsigned();
    table.float('price').notNullable().unsigned();
    table.float('rating').notNullable().unsigned();
    table.float('stock').notNullable().unsigned();
    table.string('brand').notNullable();
    table.string('title').notNullable();
    table.timestamps(true, true);     
  });
}

export async function down(knex: Knex): Promise<void> {
  // // Drop the foreign key constraint 
  // await knex.schema.alterTable('products', (table) => {
  //   table.dropForeign(['category_id']);
  // });

  // Then drop the products tablefirst
  await knex.schema.dropTableIfExists('products');
}