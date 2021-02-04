const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.set('port', 3000);
app.use(morgan('dev'));
app.use(cors())

app.use(express.json());

app.use('/api', require('./routes/alumnos'));

app.listen(app.get('port'), () => {
  console.log(`Servidor conectado en el puerto ${app.get('port')}`)
})