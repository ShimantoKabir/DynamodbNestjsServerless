import {Controller, Inject, Get, Param, Delete, Post, Body, Patch,} from "@nestjs/common";
import {DR, DynamoRepository} from "../../data/repositories/DynamoRepository";
import {Role} from "../../data/models/Role";
import {IOMsg} from "../../../common/IOMsg";
import {RoleRequestModel} from "../../../usercase/domains/RoleRequestModel";
import {plainToClassFromExist} from "class-transformer";

@Controller("roles")
export class RoleController {

  constructor(
    @Inject(DR)
    private readonly repo: DynamoRepository<Role>
  ) {}

  @Post()
  async save(
    @Body() roleRequestModel: RoleRequestModel
  ) : Promise<Role|string> {

    const r = plainToClassFromExist(new Role(),roleRequestModel);

    const role = await this.repo.create(r);
    if (role === null){
      return IOMsg.ERROR;
    }else {
      return role;
    }
  }

  @Get(":id")
  async get(@Param("id") id: string) : Promise<Role|string> {
    const r = plainToClassFromExist(new Role(), {id: id});
    const role = await this.repo.read(r);
    if (role === null){
      return IOMsg.ERROR;
    }else {
      return role;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() roleRequestModel: RoleRequestModel
  ) {
    const r = plainToClassFromExist(new Role(), roleRequestModel);
    const role =  await this.repo.update(id,r);
    if (role === null){
      return IOMsg.ERROR;
    }else {
      return role;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) : Promise<boolean> {
    const r = plainToClassFromExist(new Role(), {id: id});
    return await this.repo.delete(r);
  }

  @Get()
  async findAll() : Promise<Role[]>{
    return await this.repo.readAll(new Role());
  }
}