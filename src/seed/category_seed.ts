import Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('category').insert([
    { category_name: 'smartphones' },
    { category_name: 'laptops' },
    { category_name: 'fragrances' },
    { category_name: 'skincare' },
    { category_name: 'groceries' },
    { category_name: 'home-decoration' },
    { category_name: 'furniture' },
    { category_name: 'tops' },
    { category_name: 'womens-dresses' },
    { category_name: 'womens-shoes' },
    { category_name: 'mens-shirts' },
    { category_name: 'mens-shoes' },
    { category_name: 'mens-watches' },
    { category_name: 'womens-watches' },
    { category_name: 'womens-bags' },
    { category_name: 'womens-jewellery' },
    { category_name: 'sunglasses' },
    { category_name: 'automotive' },
    { category_name: 'motorcycle' },
    { category_name: 'lighting' },
  ]);
}