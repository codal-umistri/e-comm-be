import Knex from 'knex';

export async function up(knex:Knex):Promise<void>
{
  await knex.schema.createTable('category',(table)=>
  {
    table.increments('id').primary();
    table.string('category_name').notNullable().unique();
    table.timestamps(true, true);     
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('category');
}