const express = require('express');
const bodyParser = require('body-parser');
const services = require('./services/talkersService');
const middlewares = require('./middlewares/talkersMiddlewares');
// const routes = require('./routes/index');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', services.getTalkers);

app.get('/talker/:id', services.getTalkerById);

// não remova esse endpoint, para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/login',
  middlewares.emailValidate,
  middlewares.passwordValidate,  
  services.getToken);

app.post('/talker',
  middlewares.tokenValidate,
  middlewares.nameValidate,
  middlewares.ageValidate,
  services.newTalker); 

app.listen(PORT, () => {
  console.log('Online');
});
