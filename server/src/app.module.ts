import { Module } from '@nestjs/common';
import {EmployeeModule} from "./adapter/http/employee/EmployeeModule";
import {RoleModule} from "./adapter/http/role/RoleModule";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    EmployeeModule,
    RoleModule,
    ConfigModule.forRoot({isGlobal: true})
  ],
})
export class AppModule {}
