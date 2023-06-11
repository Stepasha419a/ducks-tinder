import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UserDto } from 'users/dto';
import { PrismaService } from 'prisma/prisma.service';
import { UsersSelector } from 'users/users.selector';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: CreateUserCommand): Promise<UserDto> {
    const { dto } = command;

    const user = await this.prismaService.user.create({
      data: dto,
      include: UsersSelector.selectUser(),
    });

    return new UserDto(user);
  }
}
