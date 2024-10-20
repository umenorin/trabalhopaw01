import { Message } from "../messages/message.model";
export class User {
    constructor(
        public firstName: string,
        public lastName: string,
        public password: string,
        public email: string,
        public gender: string,
        public civilStatus: string,
        public messages:Message[],
        public userId: string
    ) {
        
        }
}