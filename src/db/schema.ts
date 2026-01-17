import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'users',
      columns: [
        { name: 'remote_id', type: 'number', isIndexed: true },
        { name: 'first_name', type: 'string' },
        { name: 'last_name', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'birth_date', type: 'string' },
        { name: 'age', type: 'number' },
        { name: 'gender', type: 'string' },
        { name: 'image', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'meta',
      columns: [
        { name: 'meta_name', type: 'string', isIndexed: true },
        { name: 'meta_value', type: 'string' },
      ],
    }),
  ],
});