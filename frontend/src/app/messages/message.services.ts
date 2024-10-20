import { inject, Injectable } from "@angular/core";
import { Message } from "./message.model";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { map,tap } from 'rxjs/operators';

@Injectable()
export class MessageService {
    private baseUrl = "http://localhost:3000";
    private messageSService: Message[] = [];
    private http = inject(HttpClient);
    errorHandler(e:any, info:string): Observable<any>{
        throw({
            info_extra: info,
            error_SS: e,
            error_cs: "Clent-Side: errorHandler: Ocorreu um erro!"
        })
    }
    addMessage(message: Message) {
        this.messageSService.push(message);
        console.log('Mensagem adicionada:', message);
        return this.http.post<any>(`${this.baseUrl}/message`,message).pipe(
            catchError((e) => this.errorHandler(e, "addMessage()"))
        );
    }

    getMessages(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/message`).pipe(
            map((responseRecebida: any)=> {
                console.log(responseRecebida);
                console.log({content: responseRecebida.objSMessageSRecuperadoS[0].content})
                console.log({_id: responseRecebida.objSMessageSRecuperadoS[0]._id})

                const messageSResponseRecebida = responseRecebida.objSMessageSRecuperadoS;

                let transFomedCastMessagesModelFrontend: Message[] =[];
                for(let msg of messageSResponseRecebida){
                    transFomedCastMessagesModelFrontend.push(
                        new Message(msg.content, 'Vinicius', msg._id)
                    );

                }
                this.messageSService = [...transFomedCastMessagesModelFrontend];
                responseRecebida.objSMessageSRecuperadoS = this.messageSService;
                console.log({myMsgSucesso: responseRecebida.myMsgSucesso})
                console.log({content: responseRecebida.objSMessageSRecuperadoS[0].content})
                console.log({id: responseRecebida.objSMessageSRecuperadoS[0].messageId})
                return responseRecebida;
            }),
            catchError((e) => this.errorHandler(e,"getMessages("))
        )
    }
    // Método para editar a mensagem existente no backend
    editMessage (message: Message): Observable<any> {
        const updatedMessage = {
            content: message.content,  // Conteúdo atualizado
        };
    
        console.log('Enviando atualização para o backend:', updatedMessage);
    
        return this.http.patch<any>(`${this.baseUrl}/message/${message.messageId}`, updatedMessage).pipe(
            map((response) => {
                console.log('Resposta do backend ao atualizar mensagem:', response);
        
                // Atualizar a mensagem diretamente no array sem criar um novo objeto
                let tempList = this.messageSService.map(msg => {
                    if (msg.messageId === message.messageId) {
                        // Atualizar a mensagem existente com os novos dados
                        msg.content = response.objMessageUpdated.content;
                    }
                    return msg;
                });
        
                // Substitui a lista original pela lista temporária atualizada
                this.messageSService = tempList;
        
                return response;
            }),
            catchError((e) => this.errorHandler(e, "updateMessage()"))
        );
        
        
    }
    
    

    // Método para excluir uma mensagem
    deleteMessage(message: Message): Observable<any> {
        return this.http.delete(`${this.baseUrl}/message/${message.messageId}`).pipe(
          tap(() => {
            const index = this.messageSService.indexOf(message);
            if (index >= 0) {
              this.messageSService.splice(index, 1);
              console.log('Mensagem excluída:', message);
            }
          }),
          catchError((error) => {
            console.error('Erro ao excluir mensagem:', error);
            return throwError(error);
          })
        );
    }
      
    

    

}
