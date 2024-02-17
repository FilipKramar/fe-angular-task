import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Message } from '../message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  user: string = '';
  message: string = '';

  ngOnDestroy(): void {
    this.chatService.closeConnection();
  }
  ngOnInit(): void {
    this.chatService.openConnection();
  }
  modalVisible: boolean = false;

  constructor(public chatService:ChatService){

  }
  toggleModal() {
    this.modalVisible = !this.modalVisible;
    
  }

  sendMessage() {
    const chatMsg = new Message(this.user, this.message);
    this.chatService.sendWebSocketMessage(chatMsg);
    this.message = ''; 
  }

}
