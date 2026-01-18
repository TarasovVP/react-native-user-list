import { database } from './database';
import { User } from '../features/users/types/user';
import { UserRecord } from './models/UserRecord';

const usersCollection = database.collections.get<UserRecord>('users');

const toDomain = (r: UserRecord): User => ({
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

export const usersDB = {
  loadUsers: async (): Promise<User[]> => {
    const records = await usersCollection.query().fetch();
    return records.map(toDomain);
  },

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
          r.image = u.image;
          r.age = u.age;
          r.birthDate = u.birthDate;
          r.gender = u.gender;
        })
      );

      await database.batch(...deletes, ...creates);
    });
  },

  clearUsers: async (): Promise<void> => {
    await database.write(async () => {
      const users = await usersCollection.query().fetch();
      await database.batch(...users.map((r) => r.prepareDestroyPermanently()));
    });
  },
};
