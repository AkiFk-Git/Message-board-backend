import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Delete,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(
    @Body('message')
    message: string,
    @Query('userUuid')
    userUuid: string,
    @Query('token')
    token: string,
  ) {
    await this.postService.createPost(message, token, userUuid);
  }

  @Get()
  async getList(
    @Query('token') token: string,
    @Query('start') start: number,
    @Query('records') records: number,
  ) {
    return await this.postService.getList(token, start, records);
  }

  @Put()
  async putPost(
    @Body('message') message: string,
    @Query('token') token: string,
    @Query('userUuid') userUuid: string,
    @Query('postId') postId: number,
  ) {
    await this.postService.putPost(token, userUuid, postId, message);
  }

  @Delete()
  async deletePost(
    @Query('userUuid') userUuid: string,
    @Query('token') token: string,
    @Query('postId') postId: number,
  ) {
    await this.postService.deletePost(userUuid, token, postId);
  }
}
