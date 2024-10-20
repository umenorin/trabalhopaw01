import { Component,Input,input,Output,EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from './message.services';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  //@Input() messageVarClasse: Message = new Message("","","","")
  messageVarClasse = input<Message>(new Message("",""))

  constructor(private messageServiceObj: MessageService){}
  
  @Output() outputMessage = new EventEmitter<string>();
  color='yellow';

  onEdit() {
    const newContent = prompt('Digite o novo conteúdo da mensagem:', this.messageVarClasse().content);
    if (newContent !== null) {
      this.messageVarClasse().content = newContent;
      // Atualiza no backend a mensagem editada
      this.messageServiceObj.editMessage(this.messageVarClasse()).subscribe({
        next: () => {
          console.log('Mensagem editada com sucesso!');
        },
        error: (error:any) => {
          console.error('Erro ao editar mensagem', error);
        }
      });
    }
  }

  onDelete() {
    const confirmDelete = confirm('Tem certeza de que deseja excluir esta mensagem?');
    if (confirmDelete) {
      this.messageServiceObj.deleteMessage(this.messageVarClasse()).subscribe({
        next: (response) => {
          console.log('Mensagem excluída com sucesso:', response);
          // Aqui você pode executar qualquer ação após a exclusão
        },
        error: (error) => {
          console.error('Erro ao excluir mensagem:', error);
        }
      });
    }
  }
  
}
