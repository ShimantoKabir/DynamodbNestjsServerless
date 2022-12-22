export const DR = "DR";
export interface DynamoRepository<T> {
  create(entity: T): Promise<T|null>
  read(entity: T): Promise<T|null>
  update(id:string, entity: T): Promise<T|null>
  delete(entity: T) : Promise<boolean>
  readAll(formWhere: T) : Promise<T[]>
}