const bodyParser = require('body-parser')
const cors = require('cors')


module.exports = app => {
   //Configuração do consign - configuração das informações da aplicação
   app.use(bodyParser.json())
   app.use(cors({
    origin: '*'
   }))
}