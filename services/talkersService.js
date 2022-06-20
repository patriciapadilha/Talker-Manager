const fs = require('fs').promises;
const file = 'talker.json';

const getTalkers = async (req, res) => {
  const content = await fs.readFile(file, 'utf8');
  const talkersfile = JSON.parse(content);
  res.status(200).json(talkersfile);
}

const getTalkerById = async (req, res) => {
  const { id } = req.params;
  const content = await fs.readFile(file, 'utf8');
  const talkersfile = JSON.parse(content);
  const result = talkersfile.find((talker) => talker.id === Number(id));
  if(!result) {
    res.status(404).json({
      "message": "Pessoa palestrante não encontrada"
    });
  }
  res.status(200).json(result);
}

module.exports = { getTalkers, getTalkerById };