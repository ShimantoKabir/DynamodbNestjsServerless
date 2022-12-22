import {IsEmail, IsMobilePhone, IsNotEmpty} from "class-validator";

export class EmployeeRequestModel {
  id?: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  roleId: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsMobilePhone()
  contactNumber: string;
}