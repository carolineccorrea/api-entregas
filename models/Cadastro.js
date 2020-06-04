const mongoose = require('mongoose')

const Cadastro = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    dataEntrega: {
        type: String,
        required: true
    },
    pontoPartida: {
        type: String,
        required: true
    },
    pontoDestino: {
        type:String,
        required:true
    }  

});

module.exports = mongoose.model('cadastro',Cadastro);
