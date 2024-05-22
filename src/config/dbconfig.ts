import Knex from 'knex';
import bookshelf from 'bookshelf';
import knexConfig from '../../knexfile';

export const knexInstance = Knex(knexConfig);
export const bookshelfInstance = bookshelf(knexInstance);