const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');


const app = express();

app.use(bodyParser.json());


app.get('/api/timestamp/:date_string?', (req, res) => {

  let input = req.params.date_string;
  let unix, utc;

  let isoDate = moment(input, moment.ISO_8601, true).isValid();
  let unixDate = moment(parseInt(input)).isValid();

  if(isoDate == true) {
    utc = new Date(input).toUTCString();
    unix = new Date(input).getTime();
  }
  else if (isoDate == false && unixDate == true) {
    unix = new Date(parseInt(input)).getTime();
    utc = new Date(parseInt(input)).toUTCString();
  
  }
  else if (input == null) {
    unix = new Date().getTime();
    utc = new Date().toUTCString();
  }
  else {
    res.send({"error":"Invalid Date"});
    return;
  }

  res.send({unix, utc});

});

const port = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log(`Listening on port ${port} ...`);
});