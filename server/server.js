const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const feedRouter = require('./routers/feedRouter');

app.use('/api/feed', feedRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
