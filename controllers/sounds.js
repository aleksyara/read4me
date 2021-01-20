const request = require('request');
const { post } = require('../routes/api/users');
const fs = require('fs');
const util = require('util');
const textToSpeech = require('@google-cloud/text-to-speech');

module.exports = {
  processText,
};
  
// This code works, when making a pure http request to Google API, not using Google clent
async function processText(req, res) {
  const myText = 'Hello guys and girls! How do you like my voice! Whats UP!';
  let requestBody = {
    input: {
      text: myText
    },
    voice: {
      languageCode: "en-gb",
      name: "en-GB-Standard-D",
      ssmlGender: "MALE"
    },
    audioConfig: {
      audioEncoding: "MP3"
    }
  }

  request({
    url: 'https://texttospeech.googleapis.com/v1/text:synthesize?key=' + process.env.GOOGLE_API_KEY,
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: requestBody,
    json: true
  }, async function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    
    if (!error && body && body.audioContent) {
      console.log('CHECK 1A *****');

      // Audio processing - START
      const buff = Buffer.from(body.audioContent, 'base64');
      fs.writeFileSync('test2.mp3', buff);
      // Audio processing - END


      res.json({audioContent: body.audioContent});
    } else {
      console.log('CHECK 1B *****');
      res.json({message: 'Something went wrong...'});
    }
  });  
}

async function decodeAudioContent(audioContent) {
  const outputFile = '/output.mp3'
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(outputFile, audioContent, 'binary');
  console.log(`Audio content written to file: ${outputFile}`);
}