import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './signup.component.html'
})
export class SingupComponent implements OnInit{
    myForm!: FormGroup;

    onSubmit() {
        console.log(this.myForm);
        this.myForm.reset;
    }

    ngOnInit(){
        this.myForm = new FormGroup({
            firstNameTS: new FormControl(null,Validators.required),
            lastNameTS: new FormControl(null, [Validators.required,Validators.minLength(4),Validators.maxLength(16)]),
            emailTS: new FormControl(null, [
                Validators.required,
                Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
            ]),
            passwordTS: new FormControl(null, Validators.required)
        });
    }
}