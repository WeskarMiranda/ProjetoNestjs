import {
    Column,
    Model,
    Table,
    AutoIncrement,
    PrimaryKey,
  } from 'sequelize-typescript';
  
  @Table
  export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    userId: number;
  
    @Column
    name: string;
  
    @Column
    lastName: string;
  
    @Column
    email: string;
  
    @Column
    password: string;
}