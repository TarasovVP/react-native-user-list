import { Model } from '@nozbe/watermelondb';
import { text } from '@nozbe/watermelondb/decorators';

export class MetaRecord extends Model {
  static table = 'meta';

  @text('meta_name') name!: string;
  @text('meta_value') value!: string;
}