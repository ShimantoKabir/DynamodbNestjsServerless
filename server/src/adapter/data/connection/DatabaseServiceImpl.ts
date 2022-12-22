import {DatabaseService} from "./DatabaseService";
import {DocumentClient} from "aws-sdk/clients/dynamodb";
import {Injectable} from "@nestjs/common";

@Injectable()
export class DatabaseServiceImpl implements DatabaseService {
  getDynamoDBClient(): DocumentClient {
    return process.env.IS_OFFLINE === "true" ? new DocumentClient({
        region: 'localhost',
        endpoint: "http://localhost:" + process.env.DYNAMODB_PORT
    })
    : new DocumentClient();
  }
}