import { Database } from '@nozbe/watermelondb';
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';
import migrations from './migrations';
import { schema } from './schema';
import { UserRecord } from './models/UserRecord';
import { MetaRecord } from './models/MetaRecord';

const adapter = new LokiJSAdapter({
  schema,
  migrations,
  useWebWorker: false,
  useIncrementalIndexedDB: true,
  onSetUpError: (error) => {
    console.error('WatermelonDB web setup error', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [UserRecord, MetaRecord],
});