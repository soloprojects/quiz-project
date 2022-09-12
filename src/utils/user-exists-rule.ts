import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  // async validate(text: string) {
  //   return !(await this.usersService.userExists({
  //     email: text,
  //   }));
  // }

  async validate(email: string): Promise<boolean> {
    //try {
    return !!!(await User.findOne({ where: { email } }));
    // } catch (e) {
    //   return false;
    // }

    //return false;
  }

  defaultMessage(args: ValidationArguments) {
    return 'User exists, please use another email';
  }
}

export function UserExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UserExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserExistsRule,
    });
  };
}
