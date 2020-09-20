import { Injectable } from '@angular/core';
import { Messages, MessageName } from '../models/messages';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Promise<Messages>;

  constructor(api: ApiService) {
    this.messages = api.getMessages().toPromise();
  }

  async getMessage(name: MessageName): Promise<string> {
    const messages = await this.messages;
    const message = messages[name];

    if (typeof message === 'string') {
      // Show the single message
      return message;
    } else if (Array.isArray(message)) {
      // Choose a random message
      const index = Math.floor(message.length * Math.random());
      return message[index];
    } else {
      console.warn(`Could not find a message for ${name}`);
      return 'Message not found';
    }
  }
}
