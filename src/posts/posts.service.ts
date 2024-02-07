import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface PostModel {
    id: number;
    author: string;
    title: string;
    content: string;
    likeCount: number;
    commentCount: number;
  }
  
  let posts : PostModel[] = [
    {
      id: 1,
      author: 'newjeans',
      title: "뉴진스",
      content: '민지',
      likeCount: 1000,
      commentCount: 999,
    },
    {
      id: 2,
      author: 'newjeans',
      title: "뉴진스",
      content: '해린',
      likeCount: 1000,
      commentCount: 999,
    },
    {
      id: 3,
      author: 'blackpink',
      title: "블랙핑크",
      content: '제니',
      likeCount: 1000,
      commentCount: 999,
    }
  ]


@Injectable()
export class PostsService {
    constructor(
      @InjectRepository(PostsModel)
      private readonly postsRepository: Repository<PostsModel>
    ){}

    // 모든 리소스 조회
    async getAllPosts() {
        return this.postsRepository.find()
    }

    // 특정 리소스 조회
    async getPostById(id: number) {
        const post = await this.postsRepository.findOne({
          where:{
            id:id,
          },
          relations:{
            author: true
          }
        })

        if(!post){
          throw new NotFoundException()
        }

        return post
    }

    //리소스 생성
    async createPost(authorId: number, title: string, content: string){
        const post = this.postsRepository.create({
          author:{
            id: authorId
          },
          title,
          content,
          likeCount: 0,
          commentCount: 0,
        })  
        
        const newPost = await this.postsRepository.save(post)
            
          return newPost
    }

    // 리소스 수정
    async updatePost(postId: number, author?: string, title?: string, content?: string) {
        const post = await this.postsRepository.findOne({
          where:{
            id: postId
          }
        })

        if(!post){
        throw new NotFoundException()
        }      

        if(title){
        post.title = title
        }

        if(content){
        post.content = content
        }

        const newPost = await this.postsRepository.save(post)

        return {
          status: "변경 성공",
          newPost
        }
    }

    // 리소스 삭제
    async deletePost(PostId: number) {
        const post = this.postsRepository.findOne({
          where: {
            id: PostId
          }
        })        

        if(!post){
            throw new NotFoundException()
        }

        await this.postsRepository.delete(PostId)

        return "삭제 완료"
    }
}
