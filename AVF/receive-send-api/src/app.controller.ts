import { Controller, Query, Get, Post, Body, HttpException, HttpStatus, Headers, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('message')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  public async enviaMensagem(
    @Headers('authorization') token,
    @Body('userIdSend') userIdSend,
    @Body('userIdReceive') userIdReceive,
    @Body('message') message
  ): Promise<any> {
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      console.log('Recebendo nova mensagem:', { userIdSend, userIdReceive, message });
      const response = await this.appService.sendMessageUser(userIdSend, userIdReceive, message, token);
      return { message: 'Message sent successfully' };
    } catch (error) {
      throw new HttpException('Failed to send message', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('worker')
  public async workMessages(
    @Headers('authorization') token,
    @Body('userIdSend') userIdSend,
    @Body('userIdReceive') userIdReceive,
  ): Promise<any> {
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      console.log('Processando mensagens do worker:', { userIdSend, userIdReceive });
      const response = await this.appService.processChannelMessages(userIdSend, userIdReceive, token);
      return { message: 'Messages processed successfully', data: response };
    } catch (error) {
      throw new HttpException('Failed to process messages', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  public async getAllMessages(
    @Headers('authorization') token,
    @Query('user') userId,
  ): Promise<any> {
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      console.log('Recebendo todas as mensagens para o usuário:', userId);
      const messages = await this.appService.getUserMessages(userId, token);
      return messages;
    } catch (error) {
      throw new HttpException('Failed to retrieve messages', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}






