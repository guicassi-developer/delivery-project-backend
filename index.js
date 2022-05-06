const express = require('express');
const config = require('./src/config');
const cors = require('cors');
const bodyParser = require('body-parser');
const clientRoutes = require('./src/routes/client.routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/client', clientRoutes.routes);

app.listen(config.port, () => {
  console.log('app listening on url http://localhost:' + config.port )
});