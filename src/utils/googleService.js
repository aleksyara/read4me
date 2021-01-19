

const BASE_URL = '/api/users/';

function callTextToSpeechApi() {

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

    return fetch('https://texttospeech.googleapis.com/v1/text:synthesize?key=' + process.env.REACT_APP_GOOGLE_API_KEY, {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(requestBody)
        })
        .then(res => {
            if (res.ok) {
            return res.json();
            };
            throw new Error('Something is not OK');
        });
}

export default {
    callTextToSpeechApi
};