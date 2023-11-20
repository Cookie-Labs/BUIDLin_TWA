//TODO: https://medium.com/@2018.itsuki/dynamo-db-with-next-js-ea24b0cf78a4

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';

const dbClient = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_DYNAMO_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_DYNAMO_SECRET_KEY as string,
  },
  region: 'ap-northeast-2',
});
const docClient = DynamoDBDocumentClient.from(dbClient);

export const createNewParticipant = async ({
  tableName,
  participantData,
}: {
  tableName: string;
  participantData: {
    userTelegramId: string;
    lastAccess: number;
  };
}) => {
  const command = new PutCommand({
    TableName: tableName,
    Item: participantData,
  });

  try {
    const response = await docClient.send(command);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getParticipant = async ({
  tableName,
  userTelegramId,
}: {
  tableName: string;
  userTelegramId: string;
}) => {
  const command = new GetCommand({
    TableName: tableName,
    Key: {
      userTelegramId: userTelegramId,
    },
  });

  try {
    const response = await docClient.send(command);
    console.log(response);
  } catch (error: any) {
    if (error.name !== 'ValidationException') {
      throw error;
    }
  }
};

export const updateParticipant = async ({
  tableName,
  updateParticipantData,
}: {
  tableName: string;
  userTelegramId: string;
  updateParticipantData: any;
}) => {
  const command = new PutCommand({
    TableName: tableName,
    Item: updateParticipantData,
  });

  try {
    const response = await docClient.send(command);
    return response;
  } catch (error) {
    throw error;
  }
};
