import {Controller, Inject, Get, Param, Delete, Post, Body, Patch,} from "@nestjs/common";
import {DR, DynamoRepository} from "../../data/repositories/DynamoRepository";
import {Employee} from "../../data/models/Employee";
import {EmployeeRequestModel} from "../../../usercase/domains/EmployeeRequestModel";
import {IOMsg} from "../../../common/IOMsg";
import {plainToClassFromExist} from "class-transformer";

@Controller("employees")
export class EmployeeController{

  constructor(
    @Inject(DR)
    private readonly repo: DynamoRepository<Employee>
  ) {}

  @Post()

  async save(
    @Body() employeeRequestModel: EmployeeRequestModel
  ) : Promise<Employee|string> {

    const e = plainToClassFromExist(new Employee(),employeeRequestModel);
    const employee = await this.repo.create(e);

    if (employee === null){
      return IOMsg.ERROR;
    }else {
      return employee;
    }
  }

  @Get(":id")
  async get(@Param("id") id: string) : Promise<Employee|string> {

    const e = plainToClassFromExist(new Employee(), {id: id});

    const employee = await this.repo.read(e);
    if (employee === null){
      return IOMsg.ERROR;
    }else {
      return employee;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() employeeRequestModel: EmployeeRequestModel
  ) {
    const e = plainToClassFromExist(new Employee(),employeeRequestModel);
    const employee =  await this.repo.update(id,e);
    if (employee === null){
      return IOMsg.ERROR;
    }else {
      return employee;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) : Promise<boolean> {
    const e = plainToClassFromExist(new Employee(), {id: id});
    return await this.repo.delete(e);
  }

  @Get()
  async findAll() : Promise<Employee[]>{
    return await this.repo.readAll(new Employee());
  }
}