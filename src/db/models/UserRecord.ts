import { Model } from '@nozbe/watermelondb';
import { field, text } from '@nozbe/watermelondb/decorators';

export class UserRecord extends Model {
  static table = 'users';

  @field('remote_id') remoteId!: number;
  @text('first_name') firstName!: string;
  @text('last_name') lastName!: string;
  @text('email') email!: string;
  @text('phone') phone!: string;
  @text('birth_date') birthDate!: string;
  @field('age') age!: number;
  @text('gender') gender!: string;
  @text('image') image!: string;
}