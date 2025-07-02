import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { ConfigService } from '@nestjs/config';

export const createDynamoDbClient = (configService: ConfigService) => {
  const client = new DynamoDBClient({
    region: configService.get<string>('DYNAMODB_REGION'),
    endpoint: configService.get<string>('DYNAMODB_ENDPOINT'),
  });

  return DynamoDBDocumentClient.from(client);
};
