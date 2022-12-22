import {DocumentClient} from "aws-sdk/clients/dynamodb";

export const DS = "DS";
export interface DatabaseService {
  getDynamoDBClient() : DocumentClient
}