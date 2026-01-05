import { Injectable,UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';
import * as crypto from 'crypto';

import { Auth } from '../entities/auth';
import { User } from '../entities/user';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

    //サインインをして結果を返すメソッド
    async getAuth(name: string, password: string) {

      //返す登録結果の初期値
      let ret= {
        inp: false,
        user: false,
        token: '',
        user_uuid: '',
      }

      // 入力が無い場合は返り値を反映して返す
      if (!name || !password) {
        ret.inp = true;
        return ret 
      }
      
      //パスワードをハッシュ化
      const hash = crypto.createHash('md5').update(password).digest('hex');
      
      //名前とパスワードが一致するユーザーを検索して取得
      let user;
      try {
          user = await this.userRepository.findOne({
              where: {
                  name: Equal(name),
                  hash: Equal(hash),
                },
              });
            } catch (error) {
              return  ret
            }
      // 一致するユーザーがなければ、返り値に反映して返す
      if (!user) {
        ret.user = true;
        return ret
      }

      //返り値にuuidを付与
      ret.user_uuid = user.uuid;

      //　authテーブルからuuidが一致するユーザーを取得
      let auth;
      try {
        auth = await this.authRepository.findOne({
          where: {
            user_uuid: Equal(user.uuid),
          },
        });
      } catch (error){
        return ret
      }

      //　サインインの期限を確認
      const expire = new Date();
      expire.setDate(expire.getDate() + 1);
      if (auth.expire_at <= expire) {
        //　期限内の処理
        //　期限を更新
        auth.expire_at = expire;
        //　authテーブルの行を更新
        await this.authRepository.save(auth);
        //　トークンを返り値に反映
        ret.token = auth.token;
      } else {
        //　期限外の処理
        // トークンを発行
        const token = crypto.randomUUID();
        //　authテーブルに追加する行の作成
        const record = {
          user_id: user.id,
          user_uuid: user.uuid,
          token: token,
          expire_at: expire.toISOString(),
        };
        //　authテーブルの行を更新
        await this.authRepository.save(record);
        //　トークンを返り値に反映
        ret.token = token;
      }
      return ret;
    }
}
