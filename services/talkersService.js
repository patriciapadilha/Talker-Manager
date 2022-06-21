const fs = require('fs').promises;

const crypto = require('crypto');

const file = 'talker.json';

const getTalkers = async (req, res) => {
  const content = await fs.readFile(file, 'utf8');
  const talkersfile = JSON.parse(content);
  res.status(200).json(talkersfile);
};

const getTalkerById = async (req, res) => {
  const { id } = req.params;
  const content = await fs.readFile(file, 'utf8');
  const talkersfile = JSON.parse(content);
  const result = talkersfile.find((talker) => talker.id === Number(id));
  if (!result) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(result);
};

const getToken = (req, res) => {
  const userToken = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token: userToken });
};

const newTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const content = await fs.readFile(file, 'utf8');
  const talkersfile = JSON.parse(content);
  const newContent = { id: talkersfile.length + 1, name, age, talk };
  talkersfile.push(newContent);
  await fs.writeFile(file, JSON.stringify(talkersfile));
  res.status(201).json(newContent);
};

const editTalkerById = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const content = await fs.readFile(file, 'utf8');
  const talkersfile = JSON.parse(content);
  
  const result = talkersfile.filter((talker) => talker.id !== Number(id));

  const newContent = { id: Number(id), name, age, talk };

  const replace = [...result, newContent];

  await fs.writeFile(file, JSON.stringify(replace));
  res.status(200).json(newContent);
};

const deleteTalkerById = async (req, res) => {
  const { id } = req.params;

  const content = await fs.readFile(file, 'utf8');
  const talkersfile = JSON.parse(content);
  
  const result = talkersfile.filter((talker) => talker.id !== Number(id));
  await fs.writeFile(file, JSON.stringify(result));
  res.status(204).json(result);
};

module.exports = {
  getTalkers,
  getTalkerById,
  getToken,
  newTalker,
  editTalkerById,
  deleteTalkerById };