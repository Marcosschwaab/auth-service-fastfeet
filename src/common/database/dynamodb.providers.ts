import { ConfigService } from '@nestjs/config';
import { createDynamoDbClient } from './dynamodb.client';

export const DynamoDbProvider = {
  provide: 'DYNAMO_DB_DOCUMENT_CLIENT',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => createDynamoDbClient(configService),
};
