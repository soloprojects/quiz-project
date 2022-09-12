/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { Question } from './entities/question.entity';
import { Quiz } from './entities/quiz.entity';
import { QuizController } from './controllers/quiz.controller';
import { QuizRepository } from './repositories/quiz.repository';
import { QuizService } from './services/quiz.service';
import { UserModule } from '../user/user.module';
import { QuestionController } from './controllers/question.controller';
import { OptionController } from './controllers/option.controller';
import { QuestionService } from './services/question.service';
import { OptionService } from './services/option.service';

@Module({
  controllers: [QuizController, QuestionController, OptionController],
  providers: [QuizService, QuestionService, OptionService],
  imports: [TypeOrmModule.forFeature([Quiz, Question, Option]), UserModule],
  exports: [QuizService, QuestionService, OptionService],
})
export class QuizModule {}
