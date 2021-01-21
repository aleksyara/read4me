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
  const myText = 'How do you like my voice! Whats UP!';
  try {
    const googleApiResult = await callTextToSpeechGoogleApi(myText);
    console.log("googleApiResult :", googleApiResult);
    const fileDecodeAndSaveResult = await base64decodeAndSaveMp3(googleApiResult);
    console.log("fileDecodeAndSaveResult :", fileDecodeAndSaveResult);
    //Send file to S3
    //
    res.send({ googleApiResult, fileDecodeAndSaveResult });
  } catch (error) {
    console.log(error, ' this is the error');
    res.send(error); 
  }
}

async function base64decodeAndSaveMp3(audioContent) {
 
  try {
    // Audio decoding - START
    const buff = Buffer.from(audioContent, 'base64');
    // save decoded file 
    fs.writeFileSync('test2.mp3', buff);
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}



async function callTextToSpeechGoogleApi(myText) {

  let respData = "";

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
  };

  const finalResult = await new Promise(function(resolve, reject) {
    request({
      url: 'https://texttospeech.googleapis.com/v1/text:synthesize?key=' + process.env.GOOGLE_API_KEY,
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: requestBody,
      json: true
    }, function (error, response, body) {
      if (!error && body && body.audioContent) {
        resolve({ success: true, audioContent: body.audioContent });
      } else {
        reject(error);
      }
    })
    
    // .on('response', function(response) {
      
    // }).on('data', function(chunk) {
    //   respData += chunk;
    // }).on('error', function(error) {
    // }).on('end', function() {
    //   let stringResponse = respData.toString('utf8');
    //   let jsonResponse = JSON.parse(stringResponse);
    //   resolve({ success: true, audioContent: jsonResponse.audioContent });
    // });
  });

  return finalResult;

}