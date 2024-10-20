import { Component, OnInit } from '@angular/core';
import { MessageListComponent } from './message-list.component';
import { MessageInputComponent } from './message-input.component';
import { UserService } from '../auth/user.service';
import { User } from '../auth/user.model';
import { CommonModule } from '@angular/common';  // Importando CommonModule

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, MessageListComponent, MessageInputComponent],  // Incluindo CommonModule aqui
  template: `
    <div *ngIf="currentUser; else noUser" class="row">
      <!-- Exibe o componente de input de mensagem se o usuário estiver logado -->
      <app-message-input [user]="currentUser"></app-message-input>
    </div>
    <ng-template #noUser>
      <!-- Exibe uma mensagem se o usuário não estiver logado -->
      <p>Usuário não logado. Por favor, faça login para enviar uma mensagem.</p>
    </ng-template>
    <br/>
    <div class="row" *ngIf="currentUser">
      <!-- Exibe a lista de mensagens se o usuário estiver logado -->
      <app-message-list></app-message-list>
    </div>
  `,
})
export class MessageComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private userService: UserService) {
    console.log('MessageComponent constructor chamado');
  }

  ngOnInit(): void {
    console.log('ngOnInit chamado');
    this.userService.currentUser.subscribe(user => {
      console.log('User recebido:', user);
      this.currentUser = user;
    });
    console.log("Current user do messages.component");
    console.log(this.currentUser);
  }
}
