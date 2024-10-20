const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    password: {type: String, required:true},
    email: {type: String, required:true, unique: true},
    gender: {type: String, required:true},
    civilStatus: {type: String, required:true},
    profilePicture: {type: String, required: false}, // Adicionando campo para URL da foto de perfil
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
});

module.exports = mongoose.model("User", userSchema);
