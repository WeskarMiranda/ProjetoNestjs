import axios from 'axios';
import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export default class UserClient {
  private static instance: UserClient;
  private url: string;

  private constructor() {
    this.url = 'http://localhost:3004/';
  }

  public static getInstance() {
    if (UserClient.instance === undefined) {
      UserClient.instance = new UserClient();
    }

    return UserClient.instance;
  }

  public async authenticationProcess(userId: number, token: string) {
    try {
      console.log('Iniciando processo de autenticação');
      
      // Verifica se o token foi fornecido
      if (!token) {
        console.error('Token não foi fornecido');
        throw new UnauthorizedException('Token is missing');
      }

      // Decodifica o token JWT
      const decodedToken: any = jwt.decode(token);
      console.log('Token decodificado:', decodedToken);

      // Verifica se o token é válido e se pertence ao usuário
      if (!decodedToken || decodedToken.userId !== userId) {
        console.error('Token não pertence ao usuário ou é inválido');
        throw new UnauthorizedException('Token does not belong to the user');
      }

      // Chama a API de autenticação para verificar a validade do token
      const response = await axios.get(`${this.url}token?user=${userId}`, {
        headers: {
          Authorization: token,
        }
      });

      console.log('Resposta da API de autenticação:', response.data);

      if (!response.data.auth) {
        console.error('Usuário não está autenticado ou token é inválido');
        throw new UnauthorizedException('User is not authenticated or token is invalid');
      }

      return { auth: response.data.auth, userId: decodedToken.userId };
    } catch (error) {
      console.error('Erro na autenticação:', error);
      throw new UnauthorizedException('User is not authenticated or token is invalid');
    }
  }
}









