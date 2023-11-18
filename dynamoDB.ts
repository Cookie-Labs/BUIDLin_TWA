import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';

const TABLE_NAME = 'buidlin';

const dbClient = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_DYNAMO_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_DYNAMO_SECRET_KEY as string,
  },
  region: 'ap-northeast-2',
});
const docClient = DynamoDBDocumentClient.from(dbClient);

export const createNewUser = async (id: number) => {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: {
      user_id: id,
      created_at: Date.now().toString(),
      text: 'hello',
      text2: 'hello2',
      text3: 'hello3',
    },
    // ReturnValues: 'ALL_OLD',
  });
  




  
  try {
    const response = await docClient.send(command);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};
