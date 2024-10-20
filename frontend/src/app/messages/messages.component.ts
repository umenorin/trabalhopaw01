import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MessageListComponent } from './message-list.component';
import { MessageInputComponent } from './message-input.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [MessageListComponent, MessageInputComponent],
  template: `
    <div class="row">
      <app-message-input></app-message-input>
    </div>
    <br/>
    <div class="row">
      <app-message-list></app-message-list>
    </div>
  `,
})
export class MessageComponent {}
