import { Inject, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly tableName = 'Users';

  constructor(
    @Inject('DYNAMO_DB_DOCUMENT_CLIENT')
    private readonly docClient,
  ) {}

  async findByCpf(cpf: string): Promise<User | null> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: { cpf },
    });
    const result = await this.docClient.send(command);
    return result.Item as User;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const existing = await this.findByCpf(dto.cpf);
    if (existing) {
      throw new ConflictException('CPF already exists');
    }

    const user: User = {
      id: randomUUID(),
      cpf: dto.cpf,
      password: await bcrypt.hash(dto.password, 10),
      role: dto.role,
      createdAt: new Date().toISOString(),
    };

    const command = new PutCommand({
      TableName: this.tableName,
      Item: user,
    });

    await this.docClient.send(command);
    return user;
  }

  async updatePassword(cpf: string, newPassword: string): Promise<User> {
    const user = await this.findByCpf(cpf);
    if (!user) throw new NotFoundException('User not found');

    user.password = await bcrypt.hash(newPassword, 10);

    const command = new PutCommand({
      TableName: this.tableName,
      Item: user,
    });

    await this.docClient.send(command);
    return user;
  }
}
