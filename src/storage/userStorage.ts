import { Q } from '@nozbe/watermelondb';
import { database } from '../db/database';
import { User } from '../features/users/types/user';
import { UserRecord } from '../db/models/UserRecord';
import { MetaRecord } from '../db/models/MetaRecord';

const META_LAST_UPDATED = 'users_last_updated';

const usersCollection = database.collections.get<UserRecord>('users');
const metaCollection = database.collections.get<MetaRecord>('meta');

const toDomainUser = (r: UserRecord): User => ({
  id: r.remoteId,
  firstName: r.firstName,
  lastName: r.lastName,
  email: r.email,
  phone: r.phone,
  image: r.image,
  age: r.age,
  birthDate: r.birthDate,
  gender: r.gender,
});

export const userStorage = {
  saveUsers: async (users: User[]): Promise<void> => {
    await database.write(async () => {
      const existing = await usersCollection.query().fetch();
      const deletes = existing.map((r) => r.prepareDestroyPermanently());

      const creates = users.map((u) =>
        usersCollection.prepareCreate((r) => {
          r.remoteId = u.id;
          r.firstName = u.firstName;
          r.lastName = u.lastName;
          r.email = u.email;
          r.phone = u.phone;
          r.birthDate = u.birthDate;
          r.age = u.age;
          r.gender = u.gender;
          r.image = u.image;
        })
      );

      // upsert meta lastUpdated
      const meta = await metaCollection.query(Q.where('meta_name', META_LAST_UPDATED)).fetch();
      const now = Date.now().toString();

      const metaOp =
        meta[0]
          ? meta[0].prepareUpdate((m) => { m.value = now; })
          : metaCollection.prepareCreate((m) => { m.name = META_LAST_UPDATED; m.value = now; });

      await database.batch(...deletes, ...creates, metaOp);
    });
  },

  loadUsers: async (): Promise<User[]> => {
    const records = await usersCollection.query().fetch();
    return records.map(toDomainUser);
  },

  clearUsers: async (): Promise<void> => {
    await database.write(async () => {
      const users = await usersCollection.query().fetch();
      const metas = await metaCollection.query(Q.where('meta_name', META_LAST_UPDATED)).fetch();

      await database.batch(
        ...users.map((r) => r.prepareDestroyPermanently()),
        ...metas.map((m) => m.prepareDestroyPermanently())
      );
    });
  },

  getLastUpdated: async (): Promise<number> => {
    const metas = await metaCollection.query(Q.where('meta_name', META_LAST_UPDATED)).fetch();
    return metas[0]?.value ? parseInt(metas[0].value, 10) : 0;
  },
};
