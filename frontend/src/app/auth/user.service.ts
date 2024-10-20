import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model'; 

@Injectable({ providedIn: 'root' })
export class UserService {
    private baseUrl = 'http://localhost:3000/user'; 

    constructor(private http: HttpClient) {}

    // Método para criar um novo usuário
    createUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.baseUrl}`, user);
    }

    // Método para buscar todos os usuários
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}`);
    }

    // Método para buscar um usuário por ID
    getUserById(userId: string): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/${userId}`);
    }

    // Método para atualizar um usuário
    updateUser(userId: string, updatedUser: User): Observable<User> {
        return this.http.put<User>(`${this.baseUrl}/${userId}`, updatedUser);
    }

    // Método para deletar um usuário
    deleteUser(userId: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${userId}`);
    }
}
