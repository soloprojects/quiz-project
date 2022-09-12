import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { paginationDto } from 'src/utils/pagination-dto';
import { Repository } from 'typeorm';
// import {
//   IPaginationOptions,
//   paginate,
//   Pagination,
// } from 'nestjs-typeorm-paginate';
import { events } from '../../common/constants/event.constants';

import { CreateQuizDto } from '../dto/create-quiz.dto';
import { Quiz } from '../entities/quiz.entity';
//import { ResponseAddEvent } from '../events/response-add.event';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
  ) {}

  // async getAllQuiz(): Promise<Quiz[]> {
  //   return await this.quizRepository
  //     .createQueryBuilder('q')
  //     .leftJoinAndSelect('q.questions', 'qt')
  //     .getMany();
  // }

  async getAllQuiz({ page, limit }: paginationDto): Promise<Quiz[]> {
    return await this.quizRepository.find({
      relations: ['questions', 'user'],
      skip: page,
      take: limit,
    });
  }

  // async paginate(options: IPaginationOptions): Promise<Pagination<Quiz>> {
  //   const qb = this.quizRepository.createQueryBuilder('q');
  //   qb.orderBy('q.id', 'DESC');

  //   return paginate<Quiz>(qb, options);
  // }

  async getQuizById(id: number): Promise<Quiz> {
    return await this.quizRepository.findOne({
      where: {
        id,
      },
      relations: ['questions', 'questions.options'],
      withDeleted: true,
    });
  }

  async createNewQuiz(quiz: CreateQuizDto, user: User) {
    const newQuiz = await this.quizRepository.create(quiz);
    newQuiz.user = user;
    return await newQuiz.save();
  }

  // @OnEvent(events.RESPONSE_SUBMITTED)
  // checkQuizCompeleted(payload: ResponseAddEvent) {
  //   console.log('checkQuizCompeleted', payload);
  // }
}
