const fs = require('fs');
const redis = require('redis');
const client = redis.createClient();
client.on("error", (err) => { 
  console.log("Error " + err); 
  });
fs.readFile('cano.txt', 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }
  let splits = data.split(/\W/).filter((value) => value.length > 1).
  map((value) => value.toLocaleLowerCase());
  let lastWord;
  splits.forEach((value, index) => {
  if (index > 0)
    client.zincrby(`word:${lastWord}:nextwords`,1,value);
    lastWord = value;
  });
 client.quit();
});