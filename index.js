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

app.post('/login',
  middlewares.emailValidate,
  middlewares.passwordValidate,  
  services.getToken);

app.post('/talker',
  middlewares.tokenValidate,
  middlewares.nameValidate,
  middlewares.ageValidate,
  middlewares.talkValidate,
  middlewares.watchedAtValidate,
  middlewares.rateValidate,
  services.newTalker); 

app.put('/talker/:id',
  middlewares.tokenValidate,
  middlewares.nameValidate,
  middlewares.ageValidate,
  middlewares.talkValidate,
  middlewares.watchedAtValidate,
  middlewares.rateValidate,
  services.editTalkerById);

// não remova esse endpoint, para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
