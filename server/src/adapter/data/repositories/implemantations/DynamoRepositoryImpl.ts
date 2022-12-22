import "reflect-metadata";
import {DynamoRepository} from "../DynamoRepository";
import {Inject, Injectable} from "@nestjs/common";
import {DatabaseService, DS} from "../../connection/DatabaseService";
import {IOCode} from "../../../../common/IOCode";
import { v4 as uuid } from 'uuid';
import {TABLE_NAME} from "../../../../decorators/Decorators";

@Injectable()
export class DynamoRepositoryImpl<T> implements DynamoRepository<T> {

  constructor(
    @Inject(DS)
    private readonly db: DatabaseService
  ) {
  }

  async create(entity: T): Promise<T> {

    let result: T | null = null;
    entity['id'] = uuid();
    const tableName = entity[TABLE_NAME];
    delete entity[TABLE_NAME];

    try {
      const res = await this.db.getDynamoDBClient().put({
        TableName: tableName,
        Item: entity,
      }).promise();

      if (res.$response.httpResponse.statusCode === IOCode.NETWORK_SUCCESS) {
        result = entity;
      }
    } catch (e) {
      console.log("error=", e)
    }

    return Promise.resolve(result);
  }

  async delete(entity: T): Promise<boolean> {

    let isDeleted: boolean = false;
    const id = entity["id"];

    try {
      const res = await this.db.getDynamoDBClient().delete({
        TableName: entity[TABLE_NAME],
        Key: {id},
      }).promise();

      console.log("res=", res);

    } catch (e) {
      console.log("error=", e)
    }

    return Promise.resolve(isDeleted);
  }

  async read(entity: T): Promise<T> {

    let result: T | null = null;
    const id = entity["id"];

    try {
      const res = await this.db.getDynamoDBClient()
        .get({
          TableName: entity[TABLE_NAME],
          Key: {id},
        }).promise();

      if (res.$response.httpResponse.statusCode === IOCode.NETWORK_SUCCESS) {
        result = res.Item as T;
      }

    } catch (e) {
      console.log("error=", e)
    }

    return Promise.resolve(result);
  }

  async update(id: string, entity: T): Promise<T | null> {
    let result: T | null = null;

    try {

      const tableName = entity[TABLE_NAME];
      delete entity[TABLE_NAME];

      const objKeys = Object.keys(entity);
      const objValues = Object.values(entity);

      console.log("objKeys",objKeys);
      console.log("objValues",objValues);

      let updateExpression = "set ";
      let expressionAttributeNames = {};
      let expressionAttributeValues = {};

      objKeys.forEach((item, index) => {
        if (item !== "id") {
          updateExpression = updateExpression + `#key${index} = :val${index}, `;
          expressionAttributeNames["#key" + index] = item;
          expressionAttributeValues[":val" + index] = objValues[index];
        }
      });

      updateExpression = updateExpression.slice(0, -2);

      await this.db.getDynamoDBClient()
        .update({
          TableName: tableName,
          Key: {id},
          UpdateExpression: updateExpression,
          ExpressionAttributeNames: expressionAttributeNames,
          ExpressionAttributeValues: expressionAttributeValues,
        }).promise();

      result = entity;
    } catch (e) {
      console.log("error=", e);
    }

    return Promise.resolve(result);
  }

  async readAll(formWhere: T): Promise<T[]> {

    let results: T[] = [];

    try {
      const res = await this.db.getDynamoDBClient().scan({
        TableName: formWhere[TABLE_NAME],
      }).promise();

      results = res.Items as T[];
    }catch (e) {
      console.log("error=", e);
    }

    return Promise.resolve(results);
  }
}