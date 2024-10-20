import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importar Router
import { UserService } from './user.service'; // Importar UserService

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signin.component.html'
})
export class SigninComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private userService: UserService) {} // Injetar Router e UserService

  onSubmit() {
    // Lógica para lidar com o envio do formulário
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    // Adicione aqui a lógica de autenticação
    this.userService.login(this.email, this.password).subscribe(
      response => {
        // Sucesso no login
        console.log('Login bem-sucedido:', response);
        this.router.navigate(['/mensagens']); // Redirecionar para a tela de mensagens
      },
      error => {
        // Falha no login
        console.error('Erro no login:', error);
      }
    );
  }
}
