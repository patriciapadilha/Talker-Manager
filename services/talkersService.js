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
  res.status(200).json({ token: userToken })
};

module.exports = { getTalkers, getTalkerById, getToken };