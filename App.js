const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('./models/Metas');
const Meta = mongoose.model('Meta');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
  app.use(cors());
  next();
});


//senha: pxmVl6665z-A usuario:celkeapi
// modelo de teste em produção no ervidor da umbler
mongoose.connect('mongodb://celkeapi:fad212735@mongo_celkeapi:27017/celkeapi',{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
  console.log('conexao com o BD mongodb realizado com sucesso');
}).catch((err)=>{
  console.log(err);
});

// trabalhar em desenvolvimento
/* mongoose.connect('mongodb://localhost/celke',{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
  console.log('conexao com o BD mongodb realizado com sucesso');
}).catch((err)=>{
  console.log(err);
}); */

app.get('/metas', async (req,res)=>{
  
  await sleep(3000);
  function sleep(ms){
    return new Promise ((resolve)=>{
      setTimeout(resolve,ms);
    });
  }
  try {
    const metas = await Meta.find({});
    return res.json({
      error:false,
      metas
    });
  } catch (error) {
    return res.status(400).json({
      error:true,
      message:'nenhum registro encontrado!'
    });
  }
});

app.post('/metas',async (req,res)=>{
  await sleep(3000);
  function sleep(ms){
    return new Promise ((resolve)=>{
      setTimeout(resolve,ms);
    });
  }
  await Meta.create(req.body,(err)=>{
    if(err) return res.status(400).json({
      error:true,
      message:"Erro: meta não cadastrada com sucesso!"
    });
  });
  return res.json({
    error: false,
    message: "Meta cadastrada com sucesso!"
  })

});

/* app.listen(8080, ()=>{
  console.log('server online on port 8080');

}); */

// modelo para conexão no servidor da umbler
let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`server online on port ${port}: http://cursocelkeapi-com-br.umbler.net/`);

});
