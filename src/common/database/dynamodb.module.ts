import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DynamoDbProvider } from './dynamodb.providers';

@Module({
  imports: [ConfigModule],
  providers: [DynamoDbProvider],
  exports: [DynamoDbProvider],
})
export class DynamoDbModule {}
