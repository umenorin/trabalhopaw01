var express = require('express'); 
var User = require('../models/user')
var router = express.Router();


// router.get('/', (req, res, next) => {
//     res.render('index');
// });

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

module.exports = router; 
