import { RowDataPacket } from 'mysql2';

export interface User extends RowDataPacket {
  user_ID: number;
  user_mail: string;
  user_type: number;
  right_group_ID: number;
}
