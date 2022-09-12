import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { Question } from '../entities/question.entity';
import { Quiz } from '../entities/quiz.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async findQuestionById(id: number): Promise<Question> {
    return await this.questionRepository.findOne({
      where: { id },
      relations: ['quiz', 'user', 'options'],
    });
  }

  async createQuestion(
    question: CreateQuestionDto,
    quiz: Quiz,
    user: User,
  ): Promise<Question> {
    const newQuestion = await this.questionRepository.create({
      question: question.question,
    });

    newQuestion.quiz = quiz;
    newQuestion.user = user;

    return await newQuestion.save();
  }
}
