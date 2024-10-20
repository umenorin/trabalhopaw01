import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from './message.model';
import { MessageComponent } from './message.component';
import { MessageService } from './message.services';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MessageComponent],
  template: `
    <div class="col-md-8 col-md-offset-2">
      @for (msg of messageS; track $index) {
        <app-message [messageVarClasse]="msg" (outputMessage)="msg.content = $event">
          
        </app-message>
      } @empty {
        messageS é uma lista vazia 
        {{messageS.length}}
      }

    </div>
  `,
  //providers: [MessageService],
})
export class MessageListComponent implements OnInit {

  constructor(private messageService: MessageService){}
  messageS: Message[] = [];

  handleOutputMessage(content: string, msg: Message) {
    msg.content = content;
    console.log('Message updated:', msg);
  }
  ngOnInit(): void {
    this.messageService.getMessages()
      .subscribe({
        next: (dadosSucesso: any) => {
          console.log(dadosSucesso.myMsgSucesso);

          this.messageS =  dadosSucesso.objSMessageSRecuperadoS;
        },error: (dadosErro) => {
          console.log(`$== !!ERROR: ${dadosErro.info_extra}`)
          console.log(dadosErro)
        }
      })
    ;
    console.log('Mensagens carregadas:', this.messageS);
  }
  
}
