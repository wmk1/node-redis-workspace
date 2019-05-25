const fs = require('fs');
const redis = require('redis');
const client = redis.createClient();
client.on("error", (err) => { console.log("Error " + err); });
fs.readFile('cano.txt', 'utf8', function(err, data) {
 if (err) {
  return console.log(err);
 }
 var splits = data.split(/\W/).filter((value) => value.length > 1).
 map((value) => value.toLocaleLowerCase());
 var lastWord;
 splits.forEach((value, index) => {
 if (index > 0)
 client.zincrby(`word:${lastWord}:nextwords`,1,value);
 lastWord = value;
 });
 client.quit();
});