import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserRoles } from '../../user/enums/user.enum';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { UserService } from '../../user/user.service';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { Question } from '../entities/question.entity';
import { QuestionService } from '../services/question.service';
import { QuizService } from '../services/quiz.service';

@ApiTags('Questions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('question')
export class QuestionController {
  constructor(
    private questionService: QuestionService,
    private quizService: QuizService,
    private userService: UserService,
  ) {}

  @Get('/')
  getQuestions(news: string): string {
    return 'get home quickly';
  }

  @ApiCreatedResponse({
    description: 'Question added to a quiz',
    type: Question,
  })
  @Post('/create')
  @UsePipes(ValidationPipe)
  @Roles(UserRoles.ADMIN)
  async saveQuestion(
    @Request() req,
    @Body() question: CreateQuestionDto,
  ): Promise<Question> {
    const quiz = await this.quizService.getQuizById(question.quizId);
    const userData = await this.userService.getUserById(req.user.id);
    return await this.questionService.createQuestion(question, quiz, userData);
  }
}
