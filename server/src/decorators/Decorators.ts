export const TABLE_NAME = "tableName";
export function DEntity<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    tableName: string = constructor.name;
  }
}