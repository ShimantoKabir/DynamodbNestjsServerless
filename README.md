# DynamodbNestjsServerless
A demo application on how to use Dynamodb NestJs and Serverless together.

## NestJS, DynamoDB with Serverless - Step-by-Step guide
- https://medium.com/@airscholar/nestjs-application-with-dynamodb-and-serverless-framework-on-aws-a-step-by-step-guide-c4a3413f731d

## Set up DynamoDb GUI local
```bash
# Open cmd prompt
$ npm install -g dynamodb-admin

# Set endpoint
$ set DYNAMO_ENDPOINT=http://localhost:8000

# Run
$ dynamodb-admin
```
- Open browser and hit http://localhost:8001
- Help Blog URL: https://morioh.com/p/3b2d1a094050

## Deploy serverless locally
```bash
$ serverless dynamodb install
$ nest build && serverless offline start
```
