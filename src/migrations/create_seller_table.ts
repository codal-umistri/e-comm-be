import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable('seller_information');
  if (!tableExists) {
    await knex.schema.createTable('seller_information', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
      table.string('business_name').notNullable();
      table.string('gst_no').notNullable().unique();
      table.string('state').notNullable();
      table.string('city').notNullable();
      table.string('pin_code').notNullable();
      table.string('mobile_no').notNullable();
      table.string('street_address').notNullable();
      table.string('additional_address').notNullable();
      table.text('gst_certificate_url');
      table.text('aadhar_card_url');
      table.text('address_proof_url');
      table.text('pan_card_url');
      table.timestamps(true, true);
    });
  } else {
    console.log('Table "seller_information" already exists. Skipping creation.');
  }
}

export async function down(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable('products');
  if (tableExists) {
    await knex.schema.dropTableIfExists('seller_information');
    console.log('Table "seller_information" dropped successfully.');
  } else {
    console.log('Table "seller_information" does not exist. Skipping drop.');
  }
}
