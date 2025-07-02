import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('admin')
  async create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get(':cpf')
  @Roles('admin')
  async find(@Param('cpf') cpf: string) {
    return this.usersService.findByCpf(cpf);
  }

  @Put(':cpf/password')
  @Roles('admin')
  async updatePassword(
    @Param('cpf') cpf: string,
    @Body() body: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(cpf, body.newPassword);
  }
}
