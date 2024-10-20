var express = require('express');
var router = express.Router();
const Message = require('../models/message');

router.get('/', async function (req, res, next){
    try{
        const messageFindTodos = await Message.find({});
        res.status(200).json({
            myMsgSucesso: "Mensagens recuperadas com sucesso",
            objSMessageSRecuperadoS: messageFindTodos
        });
    }catch(err){
        return res.status(500).json({
            myErrorTItle: "Serve-Side: Um erro aconteceu ao buscar as MensagenS",
            myError: err
        })
    }
})

router.post('/', async function (req, res, next) {
    const messageObject = new Message ({
        content: req.body.content
    });
    console.log("Estou recebendo uma mensagem nova")
    try{
        const messageSave = await messageObject.save();
        console.log(messageSave);
        res.status(201).json({
            myMsgSucesso: "Messagem salva com sucesso",
            objMessageSave: messageSave
        })
    }catch(err){
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Um erro aconteceu ao salvar a msg",
            myError : err
        });
    }

});

router.delete('/:id', async function (req, res, next) {
    const messageId = req.params.id;
    console.log(`Deleting message with ID: ${messageId}`);

    try {
        const messageDeleted = await Message.findByIdAndDelete(messageId);
        
        if (!messageDeleted) {
            console.log(`Mensagem com ID ${messageId} não encontrada.`);
            return res.status(404).json({
                myErrorTitle: "Serve-Side: Mensagem não encontrada",
                myError: "Nenhuma mensagem foi encontrada com o ID fornecido."
            });
        }

        console.log(`Mensagem deletada:`, messageDeleted);
        res.status(200).json({
            myMsgSucesso: "Mensagem deletada com sucesso",
            objMessageDeleted: messageDeleted
        });
    } catch (err) {
        console.log(`Erro ao deletar mensagem:`, err);
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Um erro aconteceu ao deletar a mensagem",
            myError: err
        });
    }
});

router.patch('/:id', async function (req, res, next) {
    const messageId = req.params.id;
    const { content, author } = req.body;  // Campos para atualizar
    console.log(messageId)
    console.log('Atualizando mensagem com ID:', messageId);
    
    try {
        const updatedMessage = await Message.findByIdAndUpdate(
            messageId,
            { content, author },  // Campos atualizados
            { new: true }  // Retorna o documento atualizado
        );

        if (!updatedMessage) {
            return res.status(404).json({
                myErrorTitle: "Serve-Side: Mensagem não encontrada",
                myError: "Nenhuma mensagem foi encontrada com o ID fornecido."
            });
        }

        res.status(200).json({
            myMsgSucesso: "Mensagem atualizada com sucesso",
            objUpdatedMessage: updatedMessage
        });
    } catch (err) {
        return res.status(500).json({
            myErrorTitle: "Serve-Side: Erro ao atualizar a mensagem",
            myError: err
        });
    }
});

module.exports = router;