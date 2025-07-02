import { IsString, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsString()
  cpf: string;

  @IsString()
  password: string;

  @IsIn(['admin', 'deliveryman'])
  role: 'admin' | 'deliveryman';
}
