import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { map,tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
    private baseUrl = 'http://localhost:3000/user';
    
    // BehaviorSubject para armazenar o usuário logado
    private _currentUser = new BehaviorSubject<User | null>(null); // Inicializa com null
    public currentUser: Observable<User | null> = this._currentUser.asObservable();

    constructor(private http: HttpClient) {

        // Aqui você deve restaurar o usuário logado de algum lugar (ex: localStorage)
        const storedUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (storedUser) {
        this._currentUser.next(storedUser); // Se já estiver logado, emite o usuário
        }
    }

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

    // Método para autenticar um usuário
    login(email: string, password: string): Observable<User> {
        // Exemplo de login simulado
        return this.http.post<User>('http://localhost:3000/user/signin', { email, password })
          .pipe(
            tap((response: any) => {
              // Acessa o objeto user a partir de objUserRecuperados
              const user = response.objUserRecuperados;
      
              // Atualiza o BehaviorSubject com o usuário recuperado
              this._currentUser.next(user);
      
              // Salva o usuário no localStorage
              localStorage.setItem('currentUser', JSON.stringify(user));
      
              console.log("Usuário logado com sucesso aqui no UserService");
              console.log(this._currentUser.value);  // Mostra o valor atual no BehaviorSubject

              console.log("CUrrent User:")
              console.log(this.currentUser)
            })
          );
      }
      
    
      logout() {
        this._currentUser.next(null); // Limpa o usuário logado
        localStorage.removeItem('currentUser'); // Remove o usuário do localStorage
      }
    
}
