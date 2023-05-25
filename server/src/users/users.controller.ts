import { UsersService } from './users.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Patch,
  Get,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ShortUser } from './users.interface';
import {
  DeletePictureDto,
  SavePictureDto,
  UpdateUserDto,
  UserDto,
  UserPairDto,
  UserSortsDto,
  MixPicturesDto,
} from './dto';

// TODO: refactor it with req.user
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sorted')
  @HttpCode(HttpStatus.OK)
  getSortedUser(@Body() dto: UserSortsDto): Promise<ShortUser> {
    return this.usersService.getSorted(dto);
  }

  @Post('picture')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('picture'))
  savePicture(
    @Body() dto: SavePictureDto,
    @UploadedFile() picture: Express.Multer.File,
  ): Promise<UserDto> {
    return this.usersService.savePicture(dto, picture);
  }

  @Put('picture')
  @HttpCode(HttpStatus.OK)
  deletePicture(@Body() dto: DeletePictureDto): Promise<UserDto> {
    return this.usersService.deletePicture(dto);
  }

  @Put('picture/mix')
  @HttpCode(HttpStatus.OK)
  mixPictures(@Body() dto: MixPicturesDto): Promise<UserDto> {
    return this.usersService.mixPictures(dto);
  }

  @Get('pairs/:id')
  @HttpCode(HttpStatus.OK)
  getPairs(@Param('id') id: string): Promise<ShortUser[]> {
    return this.usersService.getPairs(id);
  }

  @Post('pairs')
  @HttpCode(HttpStatus.OK)
  createPair(@Body() dto: UserPairDto): Promise<ShortUser[]> {
    return this.usersService.createPair(dto);
  }

  @Put('pairs')
  @HttpCode(HttpStatus.OK)
  deletePair(@Body() dto: UserPairDto): Promise<ShortUser[]> {
    return this.usersService.deletePair(dto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  patch(@Body() dto: UpdateUserDto, @Param('id') id: string): Promise<UserDto> {
    return this.usersService.patch(id, dto);
  }
}
