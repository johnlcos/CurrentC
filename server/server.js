const express = require('express');
const { Pool } = require('pg')
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;

app.use(cors());


const pool = new Pool({
  host:
})


app.get('/api/home', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
