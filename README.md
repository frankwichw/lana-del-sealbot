# Lana Del Sealbot
What could be a better combination than seals and the lyrics of Lana Del Rey? Not much, and that's why this Twitter bot exists. 
## Running Locally
Using this bot requires that you set up an [app with Twitter](https://apps.twitter.com/ "Apps.Twitter") in order to get API keys. Once you have keys, clone the repository and replace the "process.env.KEY" values in the Twit object with your own keys. 

You will also need to provide your own images in a folder called "images" in the main directory. Name your seal images with the convention `seal1.jpg`, `seal2.jpg`, and so on.

At that point you should be able to navigate to the main directory of the repository in your command line, and type `node bot.js` to run it. Check your Twitter to find out what combination of Lana lyrics and seals you got!
## Info
### Hosted on
* [Heroku](https://heroku.com/ "Heroku")
### Node Packages
* [Twit](https://www.npmjs.com/package/twit "Twit npm package")
* [File-System](https://www.npmjs.com/package/file-system "Fs npm package")