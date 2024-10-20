import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from './messages/message.component';  
import { Message } from './messages/message.model';
import { CommonModule } from '@angular/common';
import { MessageListComponent } from './messages/message-list.component';
import { MessageInputComponent } from './messages/message-input.component';
import { HeadersComponent } from './header.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MessageComponent,MessageListComponent, MessageInputComponent,RouterOutlet,HeadersComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "front-end";

  mostrarElemento: boolean= true;
  onMudaMostrarElemento(){
    this.mostrarElemento = !this.mostrarElemento;
  }

  messageBiding: Message = new Message("Texto da mensagem via Input", "ViniciusROsalen");
  messageS: Message[] = [
    new Message("Texto 01", "ViniciusROsalen"),
    new Message("Texto 02", "ViniciusRsalen"),
    new Message("Texto 03", "ViniusROsalen")
  ];

  // Método para lidar com eventos emitidos do componente filho
  handleOutputMessage(content: string, msg: Message) {
    // Atualiza o conteúdo da mensagem
    msg.content = content;
    console.log('Message updated:', msg);
  }
}