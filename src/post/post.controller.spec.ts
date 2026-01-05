import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { PostController } from './post.controller';
import { PostService } from './post.service';

describe('PostController', () => {
  let service: PostService; // 差し替え用のサービス

  //テストごとに毎回呼ばれる処理
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        {
          provide: PostService,  // PostServiceを差し替える
          useValue: {
            createPost: jest.fn().mockReturnValue({}),  // createPost関数を差し替える
          },
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  //テスト本体
  it('postController', async () => {
    const controller = new PostController(service);  // テスト対象のコントローラ作成
    await controller.createPost("hoge", 'xxx-xxx-xxx-xxx');  // createPost関数の呼び出し
    expect(service.createPost).toHaveBeenCalledTimes(1);  // 呼び出し回数の確認
  });
});
