const request = require('request');
const { post } = require('../routes/api/users');
const fs = require('fs');
const path = require('path');
const util = require('util');
const textToSpeech = require('@google-cloud/text-to-speech');

const { v4: uuidv4 } = require('uuid');//create uniqe id
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3(); // initialize the construcotr


module.exports = {
  processText,
};

// This code works, when making a pure http request to Google API, not using Google clent
async function processText(req, res) {

  const requestBody = req.body;
  
  try {
    const myText = requestBody.text;
    // STEP 1 making call to text to speech Google API
    const googleApiResult = await callTextToSpeechGoogleApi(myText);
    console.log("googleApiResult :", googleApiResult);

    // STEP 2 decoding response from Google API & save to temp mp3 file
    const fileDecodeAndSaveResult = await base64decodeAndSaveMp3(googleApiResult.audioContent);
    console.log("fileDecodeAndSaveResult :", fileDecodeAndSaveResult);
    
    // STEP 3 uploading mp3 file to S3 bucekt
    const uploadToS3Results = await uploadFileToS3(fileDecodeAndSaveResult.buffer);
    console.log("uploadToS3Results :", uploadToS3Results);
    
    res.send({ googleApiResult, fileDecodeAndSaveResult, uploadToS3Results, location: uploadToS3Results.location });
  } catch (error) {
    console.log('Error from processText(): ', error);
    res.status(500).send(error);
  }
}

async function callTextToSpeechGoogleApi(myText) {

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
    
  });

  return finalResult;

}

async function base64decodeAndSaveMp3(audioContent) {
  try {
    // Audio decoding - START
    const buff = Buffer.from(audioContent, 'base64');
    // If you need to save decoded file to local folder for whatever reason run line below
    // fs.writeFileSync(path.join(__dirname,"../temp-sounds","temp-sound.mp3"), buff);
    return { success: true, buffer: buff };
  } catch (error) {
    throw error;
  }
}

async function uploadFileToS3(buffer) {
  const randomUUID = uuidv4();
  const filePath = `tuzik/${randomUUID}.mp3`;
  const params = { Bucket: 'read4me', Key: filePath, Body: buffer };
  const finalResult = await new Promise(function(resolve, reject) {
    s3.upload(params, async function(err, data) {
      console.log("data: ", data);
      if (err) {
        reject(err);
      } else {
        resolve({ success: true, location: data.Location });
      }
    });
  });
  return finalResult;
}





 
