import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import PageHeader from '../../components/Header/Header';
import StoryFeed from '../../components/StoryFeed/StoryFeed';
import { Grid } from 'semantic-ui-react';
import googleService from '../../utils/googleService';
import { fs } from 'fs';
import util from 'util';
import base64 from 'react-native-base64';
import fsReact from 'fs-react';

export default function Feed({user, handleLogout}){
    
    async function processText(e) {
      e.preventDefault();
      console.log("button was clicked*********");
      const BASE_URL = '/api/sounds/';
      const requestBody = {};
      fetch(BASE_URL, {
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
      // try {
      //   const myResponse = await googleService.callTextToSpeechApi();
      //   const decodedString = decodeAudioContent(myResponse.audioContent);
      //   writeStringToFile();
      // } catch (err) {
      //   console.log(err.message);
      //   throw new Error('Error at processText(): ', err);
      // }
    }
    // base64 synthesize-output-base64.txt --decode > synthesized-audio.mp3
    // async function decodeBase64(input) {

    //   const writeFile = util.promisify(fs.writeFile);
    //   await writeFile(outputFile, input, 'binary');
    //   console.log(`Audio content written to file: ${outputFile}`);  

    // }

    function decodeAudioContent(audioContent) {
      console.log('audioContent: ', audioContent);
      let decodedString = base64.decode(audioContent);
      console.log('decodedString: ', decodedString);
      return decodedString;
    }

    async function writeStringToFile(myString) {
      console.log('CHeCK 1 *****');
      console.log('myString: ', myString);
      // RNFS.writeFile('/my-sound.mp3', myString, 'ascii').then(res => {
      //   console.log('res: ', res);
      // })
      // .catch(err => {
      //     console.log(err.message, err.code);
      // });
    }

    return (
      <div>
        <h1>This is the homepage!</h1>
        <button onClick={processText}>SPEAK</button>
        <audio controls>
          <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg"></source>
          Your browser does not support the audio element.
        </audio>
     </div>
        // <Grid centered >
        //   <Grid.Row>
        //     <Grid.Column>
        //       <PageHeader user={user} handleLogout={handleLogout}/>
        //     </Grid.Column>
        //   </Grid.Row>
        //         <Grid.Row>
        //   <Grid.Column style={{maxWidth: 450}}>
        //     <StoryFeed story={story} isProfile={false} user={user} />
        //   </Grid.Column>
        //   </Grid.Row>
        // </Grid>

      )
  }