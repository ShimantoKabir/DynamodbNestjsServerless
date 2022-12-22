import {Module} from "@nestjs/common";
import {RoleController} from "./RoleController";
import {DR} from "../../data/repositories/DynamoRepository";
import {DS} from "../../data/connection/DatabaseService";
import {DatabaseServiceImpl} from "../../data/connection/DatabaseServiceImpl";
import {DynamoRepositoryImpl} from "../../data/repositories/implemantations/DynamoRepositoryImpl";

@Module({
  imports : [],
  controllers: [RoleController],
  providers: [
    {
      provide: DR,
      useClass: DynamoRepositoryImpl
    },
    {
      provide: DS,
      useClass: DatabaseServiceImpl
    }
  ],
})
export class RoleModule {}