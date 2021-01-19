const request = require('request');
const { post } = require('../routes/api/users');

module.exports = {
  processText,
};
  
function processText(req, res) {
  const myText = 'Hello guys!';
  let requestBody = {
    input: {
      text: myText
    },
    voice: {
      languageCode: "en-gb",
      name: "en-GB-Standard-A",
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
  }, function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    
    if (!error && body && body.audioContent) {
      console.log('CHECK 1A *****');
      res.json({audioContent: body.audioContent});
    } else {
      console.log('CHECK 1B *****');
      res.json({message: 'Something went wrong...'});
    }
  });  
}