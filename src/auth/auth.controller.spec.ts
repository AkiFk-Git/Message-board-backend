import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let service: AuthService; // 差し替え用のサービス

  //テストごとに毎回呼ばれる処理
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        {
          provide: AuthService,  // AuthServiceを差し替える
          useValue: {
            getAuth: jest.fn().mockReturnValue({}),  // getAuth関数を差し替える
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  //テスト本体
  it('authController', async () => {
    const controller = new AuthController(service);  // テスト対象のコントローラ作成
    await controller.getAuth("hoge", 'xxx-xxx-xxx-xxx');  // getAuth関数の呼び出し
    expect(service.getAuth).toHaveBeenCalledTimes(1);  // 呼び出し回数の確認
  });
});
