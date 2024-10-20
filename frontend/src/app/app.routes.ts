import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';
import { LogoutComponent } from './auth/logout.componrnt';
import { MessageListComponent } from './messages/message-list.component'; // Importar o componente de mensagens
import { AuthenticationComponent } from './auth/authentication.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.components';
import { AUTH_ROUTES } from './auth/auth.roulers';

export const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'messages', component: MessageListComponent }, // Adicionar a rota de mensagens
  { path: 'user', title: 'Autenticação', children: AUTH_ROUTES, component: AuthenticationComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
