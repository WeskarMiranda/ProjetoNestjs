import axios from 'axios';

export class MessageClient {
  private static instance: MessageClient;
  private url: string;

  private constructor() {
    this.url = 'http://localhost:3005/';
  }

  public static getInstance() {
    if (!MessageClient.instance) {
      MessageClient.instance = new MessageClient();
    }

    return MessageClient.instance;
  }

  public async messageProcess(message: string, userIdSend: number, userIdReceive: number): Promise<any> {
    const messageResponse = { message, userIdSend, userIdReceive };
    const response = await axios.post(`${this.url}message`, messageResponse);
    return response.data;
  }

  public async getChannelMessages(userIdSend: number, userIdReceive: number): Promise<any> {
    const response = await axios.get(`${this.url}channel/messages`, {
      params: { userIdSend, userIdReceive }
    });
    return response.data;
  }

  public async getMessage(): Promise<any> {
    const response = await axios.get(`${this.url}message`);
    return response.data;
  }
}
