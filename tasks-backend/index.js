const app = require('express')();

app.get('/', (req,res) => {
    console.log('Func 0')
    res.status(200).send('Meu backend')
});
app.listen(3000, () => {
    console.log('Backend executando... ')
}) 
