import { Controller, Get, Post, Body, Query, Delete, Put } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(
    @Body('message') 
    message: string,
    @Query("user_uuid")
    user_uuid: string,
    @Query('token') 
    token: string,
  ) {
    return await this.postService.createPost(message, token, user_uuid);
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
    @Body('message')message: string,
    @Query('token')token: string,
    @Query('user_uuid')user_uuid:string,
    @Query('post_id')post_id:number,
  ){
    this.postService.putPost(token, user_uuid, post_id, message)
  }

  @Delete()
  async deletePost(
    @Query('user_uuid')user_uuid:string,
    @Query('token')token: string,
    @Query('post_id')post_id:number,
  ){
    await this.postService.deletePost(user_uuid, token, post_id)
  }
}
