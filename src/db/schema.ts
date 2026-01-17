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
        { name: 'image', type: 'string' },
        { name: 'age', type: 'number' },
        { name: 'birth_date', type: 'string' },
        { name: 'gender', type: 'string' },
      ],
    }),
  ],
});