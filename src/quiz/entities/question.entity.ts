import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Option } from './option.entity';
import { Quiz } from './quiz.entity';

@Entity('questions')
export class Question extends BaseEntity {
  @ApiProperty({
    description: 'The primary ID of question.',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The actual question',
    example: 'What is the question?',
  })
  @Column({
    type: 'varchar',
  })
  question: string;

  @ApiProperty({
    description: 'Quiz of the question',
  })
  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;

  @ApiProperty({
    description: 'Created by',
  })
  @ManyToOne(() => User, (user) => user.questions)
  user: User;

  @ApiProperty({
    description: 'Options of the question',
  })
  @OneToMany(() => Option, (option) => option.question)
  options: Option[];

  @ApiProperty({
    description: 'Created at',
    example: 'Date time',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Updated at',
    example: 'Date time',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'Updated at',
    example: 'Date time',
  })
  @DeleteDateColumn()
  deletedAt: Date;
}
