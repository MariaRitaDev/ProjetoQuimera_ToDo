const app = require('express')();
const db = require('./config/db');
const consign = require('consign')

consign() //sempre que ele passar os métodos, o middleware vai passar app como parâmetro
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)



app.db = db


app.get('/', (req,res, next) => {
    console.log('Func 0')
    res.status(200).send('Meu backend')
    next()
});
app.listen(3000, () => {
    console.log('Backend executando... ')
}) 
