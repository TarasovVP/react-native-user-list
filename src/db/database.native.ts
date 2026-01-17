import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import migrations from './migrations';
import { schema } from './schema';
import { UserRecord } from './models/UserRecord';

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  jsi: true,
  onSetUpError: (error) => {
    console.error('WatermelonDB native setup error', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [UserRecord],
});