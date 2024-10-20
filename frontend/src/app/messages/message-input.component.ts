import { FormsModule, NgForm } from "@angular/forms";
import { Component, inject, Input } from "@angular/core";
import { MessageService } from "./message.services";
import { Message } from "./message.model";
import { User } from "../auth/user.model";

@Component({
    selector: "app-message-input",
    standalone: true,
    imports: [FormsModule],
    templateUrl: './message-input.component.html',
    styles: `input.ng-invalid.ng-touched {border: 1px solid red;}`
})
export class MessageInputComponent {
    private messageService = inject(MessageService);
    @Input() user: User | null = null;  // Recebe o usuário como input

    onSubmit(form: NgForm) {
        console.log(`Form submitted with: ${form.value.myContentngForm}`);

        // Verifique se o usuário está definido antes de prosseguir
        if (this.user) {
            const messageAux = new Message(form.value.myContentngForm, this.user.firstName);

            this.messageService.addMessage(messageAux)
                .subscribe({
                    next: (dadosSucesso: any) => {
                        console.log('Mensagem enviada com sucesso:', dadosSucesso);
                    },
                    error: (dadosErro) => {
                        console.error('Erro ao enviar mensagem:', dadosErro);
                    }
                });
        } else {
            console.error('Usuário não está definido!');
        }

        form.reset(); // Limpa o formulário após o envio
    }
}
