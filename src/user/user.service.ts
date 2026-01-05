import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import * as crypto from 'crypto';
import { validate } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal, MoreThan } from 'typeorm';

import { User } from '../entities/user';
import { Auth } from '../entities/auth';
import { SignUpDto } from 'src/dto/signUp.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  //ユーザーを探してユーザー情報を返すメソッド
  async getUser(token: string, user_uuid: string) {

    // ログイン済みかチェック
    const now = new Date();
    const auth = await this.authRepository.findOne({
      where: {
        token: Equal(token),
        expire_at: MoreThan(now),
      },
    });
    if (!auth) {
      throw new ForbiddenException();
    }

    //uuidを基にユーザー情報を取得
    const user = await this.userRepository.findOne({
      where: {
        uuid: Equal(user_uuid),
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  //サインアップをして登録結果を返すメソッド
  async postUser(name: string, password: string, mail: string) {

    //返す登録結果の初期値
    let ret= {
      inp: false,
      nameDup: false,
      mailDup: false,
    }
  
    //入力のバリデーション
    //class-validatorの初期設定
    let userInfo = new SignUpDto;
    userInfo.name = name;
    userInfo.password = password;
    userInfo.mail = mail;
    //バリデーション
    const errows = await validate(userInfo);
    //問題があれば返り値に反映
    if (errows.length === 0) {
      ret.inp = true;
    }

    //ユーザー名の重複を確認
    //名前が一致するユーザーを探し、返り値に反映
    const nameDupUser = await this.userRepository.findOne({
      where: {
        name: Equal(name),
      },
    });
    if(!nameDupUser){
      ret.nameDup = true;
    }

    //メールの重複を確認
    //メールが一致するユーザーを探し、返り値に反映
    const mailDupUser = await this.userRepository.findOne({
      where: {
        umail: Equal(mail),
      },
    });
    if(!mailDupUser){
      ret.mailDup = true;
    }
    
    //パスワードをハッシュ化
    const hash = crypto.createHash('md5').update(password).digest('hex');

    //追加する行を定義
    const record = {
      name: name,
      hash: hash,
      umail: mail,
    };
    //userテーブルに列を挿入
    await this.userRepository.save(record);
    return ret
  }
}
