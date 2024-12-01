import { Body, Get, Controller, HttpCode, HttpStatus, Post, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Message} from './models/Message'

@Controller('message')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public createMessage(
    @Body() message,
  ): object {
    this.appService.createMessage(message);
    return { message: 'ok' };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getAllMessages(): Promise<object> {
    const messages = await this.appService.findAll();
    return { messages };
  }

  @Get('receive')
  public async findAllByUserIdReceive(
    @Query('userIdReceive') userIdReceive
  ): Promise<Message[]> {
    return await this.appService.findAllByUserIdReceive(userIdReceive);
  }
}
