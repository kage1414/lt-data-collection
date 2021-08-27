const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/table2csv', express.static(path.join(__dirname, 'node_modules', 'table2csv', 'dist')))

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
})