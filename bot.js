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
  let randomNumber = 
  album = Sirens[Math.floor(Math.random() * 5)];
} else if (albumNum <=10 && albumNum >= 6){
  album = LustForLife[Math.floor(Math.random() * 5)];
} else if (albumNum <= 17 && albumNum >=11){
  album = Ultraviolence[Math.floor(Math.random() * 7)];
} else if (albumNum <= 25 && albumNum >= 18){
  album = Honeymoon[Math.floor(Math.random() * 8)];
} else if (albumNum <= 41 && albumNum >= 26){
  album = Lizzy[Math.floor(Math.random() * 16)];
} else if (albumNum <= 72 && albumNum >= 27){
  album = BornToDie[Math.floor(Math.random() * 31)];
} else if (albumNum <=93 && albumNum >=73){
  album = Unreleased[Math.floor(Math.random() * 21)];
}

// keys stored on heroku
const Twitter = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET
});

// random number to decide which seal picture to use
const randomNum = Math.floor(Math.random() * 94) + 1;

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