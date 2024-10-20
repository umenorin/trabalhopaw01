export class User {
    constructor(
        public firstName: string,
        public lastName: string,
        public password: string,
        public email: string,
        public gender: string,
        public civilStatus: string,
        public profilePicture?: string, // campo opcional para foto de perfil
        public userId?: string,
        public messages?: string[] // IDs das mensagens relacionadas ao usuário
    ) {}
}
