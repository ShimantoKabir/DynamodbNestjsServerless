import {IsNotEmpty} from "class-validator";

export class RoleRequestModel {
  id?: string;

  @IsNotEmpty()
  roleName: string;
}