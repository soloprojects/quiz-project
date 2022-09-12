import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
//import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { ApiPaginatedResponse } from '../../common/decorator/api-pagination.response';
import { AdminRoleGuard } from '../../auth/admin-role.guard';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';

import { CreateQuizDto } from '../dto/create-quiz.dto';
import { Quiz } from '../entities/quiz.entity';
import { QuizService } from '../services/quiz.service';
import { paginationDto } from '../../utils/pagination-dto';
import { UserService } from '../..//user/user.service';

@ApiTags('Quiz')
@Controller('quiz')
@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuizController {
  constructor(
    private quizService: QuizService,
    private userService: UserService,
  ) {}

  @Get('/')
  @ApiPaginatedResponse({ model: Quiz, description: 'List of quizzes' })
  async getAllQuiz(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 1,
  ): Promise<Quiz[]> {
    const options: paginationDto = {
      page,
      limit,
    };
    return await this.quizService.getAllQuiz(options);
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Get a quiz by id', type: Quiz })
  async getQuizById(@Param('id', ParseIntPipe) id: number): Promise<Quiz> {
    return await this.quizService.getQuizById(id);
  }

  @ApiCreatedResponse({ description: 'The quiz that got created', type: Quiz })
  @Post('/create')
  @UsePipes(ValidationPipe)
  @Roles('admin')
  async createQuiz(
    @Request() req,
    @Body() quizData: CreateQuizDto,
  ): Promise<Quiz> {
    const userData = await this.userService.getUserById(req.user.id);
    return await this.quizService.createNewQuiz(quizData, userData);
  }
}
