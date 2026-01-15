import { IsEmail, IsString } from 'class-validator';

//サインアップ処理時のDTO
export class SignUpDto {
  @IsString()
  name: string;
  @IsString()
  password: string;
  @IsEmail()
  mail: string;
}
