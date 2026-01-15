import { IsEmail } from 'class-validator';

//サインアップ処理時のDTO
export class SignUpDto {
  name: string;
  password: string;
  @IsEmail()
  mail: string;
}
