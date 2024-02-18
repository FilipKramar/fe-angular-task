import { Injectable } from '@angular/core';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  websocketMessages: Message[] = [];
  webSocket: WebSocket | undefined;

  constructor() { }

  openConnection() {
    this.webSocket = new WebSocket('wss://echo.websocket.org');

    this.webSocket.onopen = (e) => {
      console.log("Connection established", e);
    };

    this.webSocket.onmessage = (e) => {
      const chatMsg = JSON.parse(e.data);
      this.websocketMessages.push(chatMsg);
    };

    this.webSocket.onclose = (e) => {
      console.log("Connection closed");
    };
  }

  sendWebSocketMessage(chatMsg: Message) {
    if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
      this.webSocket.send(JSON.stringify(chatMsg));
    } else {
      console.error("WebSocket connection not open or ready.");
    }
  }

  closeConnection() {
    this.webSocket?.close();
  }
}
