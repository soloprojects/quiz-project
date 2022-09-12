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
import { Question } from './question.entity';

@Entity('quizes')
export class Quiz extends BaseEntity {
  @ApiProperty({ description: 'Primary key as Quiz ID', example: 1 })
  @PrimaryGeneratedColumn({
    comment: 'The quiz unique identifier',
  })
  id: number;

  @ApiProperty({
    description: 'Title of the quiz',
    example: 'Sample Laravel quiz',
  })
  @Column({
    type: 'varchar',
  })
  title: string;

  @ApiProperty({
    description: 'Description of the quiz',
    example: 'Lorem ipsum',
  })
  @Column({
    type: 'text',
  })
  description: string;

  @ApiProperty({
    description: 'Quiz active or inactive state',
    example: true,
  })
  @Column({
    type: 'boolean',
    default: 1,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'List of questions',
  })
  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.quiz)
  user: User;

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
