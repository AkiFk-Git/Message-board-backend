import { Controller, Get, Post, Param, Query} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
      constructor(private readonly userService: UserService) {}

  @Post()
  async postUser(
    @Query('user_name') name: string,
    @Query('password') password: string,
    @Query('mail') mail: string,
  ){
    return await this.userService.postUser(name, password, mail)
  }
  @Get()
  async getUser(
    @Query('user_uuid') user_uuid: string, 
    @Query('token') token: string
  ){
    return await this.userService.getUser(token, user_uuid);
  }
}
