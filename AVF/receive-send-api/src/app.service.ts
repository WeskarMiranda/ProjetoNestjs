import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { MessageClient } from './client/MessageClient';
import UserClient from './client/UserClient';

@Injectable()
export class AppService {
  private userClient = UserClient.getInstance();
  private messageClient = MessageClient.getInstance();

  public async sendMessageUser(userIdSend: number, userIdReceive: number, message: string, token: string): Promise<any> {
    try {
      console.log('Enviando mensagem:', { userIdSend, userIdReceive, message });
      const authResponse = await this.userClient.authenticationProcess(userIdSend, token);

      if (!authResponse.auth) {
        throw new UnauthorizedException('User is not authenticated');
      }

      if (authResponse.userId !== userIdSend) {
        throw new UnauthorizedException('User ID does not match the authenticated token');
      }

      const savedMessage = await this.messageClient.messageProcess(message, userIdSend, userIdReceive);
      console.log('Mensagem salva:', savedMessage);

      return savedMessage;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      throw new HttpException('Failed to send message', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async processChannelMessages(userIdSend: number, userIdReceive: number, token: string): Promise<any> {
    try {
      console.log('Processando mensagens do canal:', { userIdSend, userIdReceive });
      const authResponse = await this.userClient.authenticationProcess(userIdSend, token);

      if (!authResponse.auth) {
        throw new UnauthorizedException('User is not authenticated');
      }

      if (authResponse.userId !== userIdSend) {
        throw new UnauthorizedException('User ID does not match the authenticated token');
      }

      const messages = await this.messageClient.getChannelMessages(userIdSend, userIdReceive);
      console.log('Mensagens do canal:', messages);

      // Mapeando as mensagens para o formato desejado
      const formattedMessages = messages.map(message => ({
        userId: message.userIdSend,
        msg: message.text,
      }));

      // Retornando as mensagens formatadas
      return formattedMessages;
    } catch (error) {
      console.error('Erro ao processar mensagens:', error);
      throw new HttpException('Failed to process messages', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getUserMessages(userId: number, token: string): Promise<any> {
    try {
      console.log('Recuperando mensagens para o usuário:', userId);
      const authResponse = await this.userClient.authenticationProcess(userId, token);

      if (!authResponse.auth) {
        throw new UnauthorizedException('User is not authenticated');
      }

      if (authResponse.userId !== userId) {
        throw new UnauthorizedException('User ID does not match the authenticated token');
      }

      const messages = await this.messageClient.getMessage();
      console.log('Mensagens recuperadas:', messages);

      return messages.map(message => ({
        userId: message.userIdSend,
        msg: message.message,
      }));
    } catch (error) {
      console.error('Erro ao recuperar mensagens:', error);
      throw new HttpException('Failed to retrieve messages', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}






