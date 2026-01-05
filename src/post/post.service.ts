import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal, MoreThan } from 'typeorm';
import { MicroPost } from '../entities/microposts';
import { Auth } from '../entities/auth';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(MicroPost)
    private microPostsRepository: Repository<MicroPost>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  //ポスト投稿のメソッド
  async createPost(message: string, token: string, user_uuid: string) {

    // ログイン済みかチェック
    const now = new Date();
    const auth = await this.authRepository.findOne({
      where: {
        user_uuid: Equal(user_uuid),
        token: Equal(token),
        expire_at: MoreThan(now),
      },
    });
    if (!auth) {
      throw new ForbiddenException();
    }

    //追加する行を定義
    const record = {
      user_id: auth.user_id,
      user_uuid: auth.user_uuid,
      content: message,
    };
    //micro_postテーブルに行を追加
    await this.microPostsRepository.save(record);
  }

  //ポスト一覧を取得するのメソッド
  async getList(token: string, start: number = 0, nr_records: number = 1) {

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

    //micro_postテーブルからデータを取得
    //SQL文を作成
    const qb = await this.microPostsRepository
      .createQueryBuilder('micro_post')
      .leftJoinAndSelect('user', 'user', 'user.id=micro_post.user_id')
      .select([
        'micro_post.id as id',
        'micro_post.user_uuid as user_uuid',
        'user.name as user_name',
        'micro_post.content as content',
        'micro_post.created_at as created_at',
      ])
      .orderBy('micro_post.created_at', 'DESC')
      .offset(start)
      .limit(nr_records);
    //テーブルの型を記述
    type ResultType = {
      id: number;
      content: string;
      user_name: string;
      created_at: Date;
    };
    //テーブルからデータを取得
    const records = await qb.getRawMany<ResultType>();

    return records;
  }

  //ポスト編集のメソッド
  async putPost(token: string, user_uuid: string,  post_id:number, message: string,){

    // ログイン済みかチェック
    const now = new Date();
    const auth = await this.authRepository.findOne({
      where: {
        user_uuid: Equal(user_uuid),
        token: Equal(token),
        expire_at: MoreThan(now),
      },
    });
    if (!auth) {
      throw new ForbiddenException();
    }

    //  ポストidとユーザーuuidが一致するポストを取得
    const post = await this.microPostsRepository.findOne({
      where: {
        id: Equal(post_id),
        user_uuid: Equal(user_uuid),
      },
    });
    //　一致するポストの内容を変更
    if (post) {
      post.content = message;
      await this.microPostsRepository.save(post);
    }
  }

  //ポスト削除のメソッド
  async deletePost(user_uuid: string, token: string,  post_id:number) {   

    // ログイン済みかチェック
    const now = new Date();
    const auth = await this.authRepository.findOne({
      where: {
        user_uuid: Equal(user_uuid),
        token: Equal(token),
        expire_at: MoreThan(now),
      },
    });
    if (!auth) {
      throw new ForbiddenException();
    }

    //  ポストidとユーザーuuidが一致するポストを取得
    const post = await this.microPostsRepository.findOne({
      where: {
        id: Equal(post_id),
        user_uuid: Equal(user_uuid),
      },
    }); 
    //一致するポストをソフトデリート
    if (post) {
      await this.microPostsRepository.softDelete(post.id);
    }
  }
}


