const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
var cors = require('cors')


const Cadastro = require('./models/Cadastro');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use((req,res,next) =>{
    res.header("Access-Control-Allow-Origin","*");
    app.use(cors());
    next();
})

 mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
    console.log('conexao com mongodb feita com sucesso');
}).catch((err)=>{
    console.log('erro');
});


app.get("/",(req,res) => {
    Cadastro.find({}).then((cadastro)=>{
       return res.json(cadastro);
    }).catch((err)=>{
       return res.status(400).json({
           error: true,
           message: "nenhum cadastro encontrado"
       });
    });
});

app.post("/cadastrar",(req,res) => {
   var cadastro = new Cadastro(req.body);

   cadastro.save().then(x=>{
        res.status(201).send({ message: "Cadastrado com sucesso" });
        console.log("cadastrado com sucesso");
   }).catch(e=>{
        res.status(400).send({ message: "erro" ,data: e});
   })

})

app.listen('8080',()=>{
    console.log('servidor iniciado na porta 8080!')
});