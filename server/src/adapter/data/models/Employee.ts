import {DEntity} from "../../../decorators/Decorators";

@DEntity
export class Employee{
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  roleId: string;
}