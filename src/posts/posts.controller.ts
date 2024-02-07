import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';




@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 모든 posts 가져오기
  @Get()
  getPosts(){
    return this.postsService.getAllPosts()
  }

  // id에 해당하는 특정 post 가져오기
  @Get(':id')
  getPost(@Param('id') id: string){
    return this.postsService.getPostById(+id)
  }

  // Post를 생성
  @Post()
  postPosts(
    @Body('authorId') authorId: number,
    @Body('title') title: string,
    @Body('content') content: string,
  ){
    return this.postsService.createPost(authorId, title, content)
  }

  // 리소스 변경
  @Put(':id')
  patchPost(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ){
    return this.postsService.updatePost(+id, author, title, content)
  }

  // 리소스 삭제
  @Delete(':id')
  deletePost(
    @Param('id') id: string
  ){
   return this.postsService.deletePost(+id) 
  }
}
