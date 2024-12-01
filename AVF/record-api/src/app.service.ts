import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './models/Message';

@Injectable()
export class AppService {
  public constructor(
    @InjectModel(Message)
    private message: typeof Message
  ) {}

  public createMessage(message: any) {
    this.message.create(message);
  }

  public async findAll(): Promise<Message[]> {
    return this.message.findAll();
  }

  public async findAllByUserIdReceive(userIdReceive: number): Promise<Message[]> {
    return await this.message.findAll({ 
      where: { 
        userIdReceive 
      } 
    });
  }
}
