const fs = require('fs').promises;
const file = 'talker.json';

const getTalkers = async (req, res) => {
 const content = await fs.readFile(file, 'utf8');
 const talkersfile = JSON.parse(content);
 res.status(200).json(talkersfile);
}

module.exports = { getTalkers };