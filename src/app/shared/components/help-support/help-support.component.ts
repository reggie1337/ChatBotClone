import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../services.service';

export interface Message {
  message: string;
  type: string;
}

@Component({
  selector: 'app-help-support',
  templateUrl: './help-support.component.html',
  styleUrls: ['./help-support.component.scss'],
})
export class HelpSupportComponent {
  isOpen = false;
  loading = false;
  messages: Message[] = [];
  chatForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  constructor(private messageService: ServicesService) {
    this.messages.push({
      type: 'client',
      message: 'How may I help you today?',
    });
  }

  openSupportPopUp() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    const sentMessage = this.chatForm.value.message!;
    this.loading = true;
    this.messages.push({
      type: 'user',
      message: sentMessage,
    });
    this.chatForm.reset();
    this.scrollToBottom();
    this.messageService.sendMessage(sentMessage).subscribe((response: any) => {
      this.loading = false;
      this.messages.push({
        type: 'client',
        message: response.message,
      });
      this.scrollToBottom();
    });
  }
  scrollToBottom() {
    const chatContainer = document.getElementById('helpdesk-popup-body');
    if (chatContainer !== null) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }
}
