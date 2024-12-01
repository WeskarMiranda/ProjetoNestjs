import {
    Column,
    Model,
    Table,
    AutoIncrement,
    PrimaryKey,
  } from 'sequelize-typescript';

  
  @Table
  export class Message extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    messageId: number;
  
    @Column
    message: string;
  
    @Column
    userIdSend: number;

    @Column
    userIdReceive: number;

  
    
}