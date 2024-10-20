import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    // Carregar todos os usuários ao iniciar o componente
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  // Método para deletar um usuário
  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(() => {
      this.users = this.users.filter(user => user.userId !== userId);  // Remover usuário da lista
    });
  }
}
