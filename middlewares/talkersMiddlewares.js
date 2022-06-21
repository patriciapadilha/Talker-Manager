const emailValidate = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!email || email.length === 0) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!regexEmail.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const passwordValidate = (req, res, next) => {
  const { password } = req.body;
  if (!password || password.length === 0) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } 

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next(); 
};

const tokenValidate = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (authorization.length < 16 || authorization.length > 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const nameValidate = (req, res, next) => {
  const { name } = req.body;
  if (!name || name.length === 0) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } 

  next();
};

const ageValidate = (req, res, next) => {
  const { age } = req.body;
  if (!age || age.length === 0) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  } 

  next();
};

module.exports = { emailValidate, passwordValidate, tokenValidate, nameValidate, ageValidate };