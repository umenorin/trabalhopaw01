import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signin.component.html'
})
export class SigninComponent {
  email: string = '';
  password: string = '';

  onSubmit() {
    // Lógica para lidar com o envio do formulário
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // Adicione aqui a lógica de autenticação
  }
}
