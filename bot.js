// dependencies
const Twit = require('twit');
const fs = require('file-system');

// requiring album files
const Sirens = require("./albums/sirens");
const Lizzy = require("./albums/lizzy");
const BornToDie = require("./albums/bornToDie");
const Ultraviolence = require("./albums/ultraviolence");
const Honeymoon = require("./albums/honeymoon");
const LustForLife = require("./albums/lustForLife");
const Unreleased = require("./albums/unreleased");

// random number that decides which album to pick
const albumNum = Math.floor(Math.random() * 94) + 1;

// initializing album variable
let album;

// if else to decide which lyric will be stored in the album var
if (albumNum <= 5){
  const randomSirens = Math.floor(Math.random() * 5);
  album = Sirens[randomSirens];
  console.log("Sirens: " + album + "\nRandom num: " + randomSirens);
} else if (albumNum <=10 && albumNum >= 6){
  const randomLFL = Math.floor(Math.random() * 5);
  album = LustForLife[randomLFL];
  console.log("Lust for Life: " + album + "\nRandom num: " + randomLFL);
} else if (albumNum <= 17 && albumNum >=11){
  const randomUltra = Math.floor(Math.random() * 7);
  album = Ultraviolence[randomUltra];
  console.log("Ultraviolence: " + album + "\nRandom num: " + randomUltra);
} else if (albumNum <= 25 && albumNum >= 18){
  const randomHoneymoon = Math.floor(Math.random() * 8);
  album = Honeymoon[randomHoneymoon];
  console.log("Honeymoon: " + album + "\nRandom num: " + randomHoneymoon);
} else if (albumNum <= 41 && albumNum >= 26){
  const randomLizzy = Math.floor(Math.random() * 16);
  album = Lizzy[randomLizzy];
  console.log("Lizzy: " + album + "\nRandom num: " + randomLizzy);
} else if (albumNum <= 72 && albumNum >= 42){
  const randomBTD = Math.floor(Math.random() * 31);
  album = BornToDie[randomBTD];
  console.log("Born to Die: " + album + "\nRandom num: " + randomBTD);
} else if (albumNum <=93 && albumNum >=73){
  const randomUnreleased = Math.floor(Math.random() * 21);
  album = Unreleased[randomUnreleased];
  console.log("Unreleased: " + album + "\nRandom num: " + randomUnreleased);
}

// keys stored on heroku
const Twitter = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET
});

// random number to decide which seal picture to use
const randomNum = Math.floor(Math.random() * 98) + 1;

// path to seal picture
const imagePath = "./images/seal" + randomNum + ".jpg";

// encoding it into base64
const b64content = fs.readFileSync(imagePath, { encoding: 'base64' })
 
// adding media to twitter
Twitter.post('media/upload', { media_data: b64content }, function (err, data, response) {
  
  // assigning alt text
  const mediaIdStr = data.media_id_string
  const altText = "Seal"
  const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
 
  // posting media
  Twitter.post('media/metadata/create', meta_params, function (err, data, response) {
    if (!err) {
      
      // parameters, status text and image
      const params = { status: album, media_ids: [mediaIdStr] }
      
      // post status!
      Twitter.post('statuses/update', params, function (err, data, response) {
        // console.log(data);
      })
    }
  })
});