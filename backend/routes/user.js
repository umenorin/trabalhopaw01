var express = require('express');
var router = express.Router();
const User = require('../models/user');
const multer = require('multer');
const path = require('path');

// Configuração do multer para salvar imagens na pasta "uploads"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Pasta onde os arquivos serão armazenados
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));  // Nome único para o arquivo
    }
});

const upload = multer({ storage: storage });

// GET: Recuperar todos os usuários
router.get('/', async function (req, res, next) {
    try {
        const users = await User.find({}).populate('messages');
        res.status(200).json({
            myMsgSucesso: "Usuários recuperados com sucesso",
            objUsersRecuperados: users
        });
    } catch (err) {
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Um erro aconteceu ao buscar os usuários",
            myError: err
        });
    }
});

// POST: Criar um novo usuário (agora com upload de foto de perfil)
router.post('/', upload.single('profileImage'), async function (req, res, next) {
    const userObject = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email,
        gender: req.body.gender,
        civilStatus: req.body.civilStatus,
        profileImage: req.file ? req.file.path : null,  // Salva o caminho da imagem no servidor
        messages: req.body.messages || []  
    });

    console.log("Estou recebendo um novo usuário");
    try {
        const userSave = await userObject.save();
        console.log(userSave);
        res.status(201).json({
            myMsgSucesso: "Usuário salvo com sucesso",
            objUserSave: userSave
        });
    } catch (err) {
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Um erro aconteceu ao salvar o usuário",
            myError: err
        });
    }
});

// DELETE: Deletar um usuário pelo ID
router.delete('/:id', async function (req, res, next) {
    const userId = req.params.id;
    console.log(`Deleting user with ID: ${userId}`);

    try {
        const userDeleted = await User.findByIdAndDelete(userId);

        if (!userDeleted) {
            console.log(`Usuário com ID ${userId} não encontrado.`);
            return res.status(404).json({
                myErrorTitle: "Serve-Side: Usuário não encontrado",
                myError: "Nenhum usuário foi encontrado com o ID fornecido."
            });
        }

        console.log(`Usuário deletado:`, userDeleted);
        res.status(200).json({
            myMsgSucesso: "Usuário deletado com sucesso",
            objUserDeleted: userDeleted
        });
    } catch (err) {
        console.log(`Erro ao deletar usuário:`, err);
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Um erro aconteceu ao deletar o usuário",
            myError: err
        });
    }
});

// PATCH: Atualizar um usuário pelo ID (agora com upload de nova foto de perfil)
router.patch('/:id', upload.single('profileImage'), async function (req, res, next) {
    const userId = req.params.id;
    const { firstName, lastName, password, email, gender, civilStatus, messages } = req.body;

    console.log(`Atualizando usuário com ID: ${userId}`);
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                firstName,
                lastName,
                password,
                email,
                gender,
                civilStatus,
                profileImage: req.file ? req.file.path : null,  // Atualiza a imagem se houver um novo upload
                messages
            },
            { new: true }  // Retorna o documento atualizado
        );

        if (!updatedUser) {
            return res.status(404).json({
                myErrorTitle: "Serve-Side: Usuário não encontrado",
                myError: "Nenhum usuário foi encontrado com o ID fornecido."
            });
        }

        res.status(200).json({
            myMsgSucesso: "Usuário atualizado com sucesso",
            objUpdatedUser: updatedUser
        });
    } catch (err) {
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Erro ao atualizar o usuário",
            myError: err
        });
    }
});

module.exports = router;
