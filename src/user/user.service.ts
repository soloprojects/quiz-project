import { Injectable } from '@nestjs/common';
import { UserRegisterRequestDto } from './dto/user-register.req.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async doUserRegistration(
    userRegister: UserRegisterRequestDto,
  ): Promise<User> {
    const user = new User();
    user.name = userRegister.name;
    user.email = userRegister.email;
    user.password = userRegister.password;
    user.role = userRegister.role;

    return await user.save();
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { email } });
  }

  async checkUserEmail(email: string): Promise<User> {
    return this.userRepo.findOneByOrFail({ email: email });
  }

  async getUserById(id: number): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { id } });
  }
}
