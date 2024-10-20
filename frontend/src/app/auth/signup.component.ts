import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';  // Ajuste o caminho conforme necessário

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit{
    myForm!: FormGroup;
    constructor(private userService: UserService) {}  // Injetando o UserService

    onSubmit() {
        if (this.myForm.valid) {
            // Pegando os dados do formulário
            const newUser = {
              firstName: this.myForm.value.firstNameTS,
              lastName: this.myForm.value.lastNameTS,
              email: this.myForm.value.emailTS,
              password: this.myForm.value.passwordTS,
              gender: this.myForm.value.genderTS,
              civilStatus: this.myForm.value.civilStatusTS,
              profilePicture: this.myForm.value.profilePictureTS
        };
        this.userService.createUser(newUser).subscribe({
            next: (response) => {
              console.log('Usuário criado com sucesso:', response);
              this.myForm.reset();  // Limpa o formulário após a criação
            },
            error: (err) => {
              console.error('Erro ao criar o usuário:', err);
            }
          });
        } else {
          console.log('Formulário inválido');
        }

    }

    ngOnInit(){
        this.myForm = new FormGroup({
            firstNameTS: new FormControl(null, Validators.required),
            lastNameTS: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
            emailTS: new FormControl(null, [Validators.required, Validators.email]),
            passwordTS: new FormControl(null, Validators.required),
            genderTS: new FormControl(null, Validators.required),
            civilStatusTS: new FormControl(null, Validators.required),
            profilePictureTS: new FormControl(null),
            termsAcceptedTS: new FormControl(false, Validators.requiredTrue)
          });
    }
}