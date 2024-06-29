import fs from 'fs';
import path from 'path';

export default (req, res) => {
  const { section, content } = req.body;
  const filePath = path.resolve('./public', `${section}.txt`);

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error writing file', error: err });
    }
    res.status(200).json({ message: 'Text updated successfully' });
  });
};
