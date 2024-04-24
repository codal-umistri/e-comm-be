import Knex from 'knex';

export async function up(knex:Knex):Promise<void>
{
  await knex.schema.createTable('users',(table)=>
  {
    table.increments('id').primary();
    table.string('first_name',100);
    table.string('last_name',100);
    table.enum('gender',['Male','Female', 'Other']);
    table.string('email',255).notNullable().unique();
    table.string('password',255).notNullable();
    table.boolean('is_seller').defaultTo(false);
    table.timestamps(true, true);     
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
}

