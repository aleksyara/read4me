import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/Header/Header';
import StoryFeed from '../../components/StoryFeed/StoryFeed';
import { Grid } from 'semantic-ui-react';
// import fs from 'fs';
// import util from 'util';

export default function Feed({user, handleLogout}){
    
    // const [story, setStory] = useState([])
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


    async function processText(e) {
      e.preventDefault();
      console.log("button was clicked*********");

      try {
        fetch('https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyBfML9ZxzqtaFapDpHDlccl8gRY1Q7NB1s', {
          method: 'POST',
          headers: new Headers({'Content-Type': 'application/json'}),
          body: JSON.stringify(requestBody)
        })
        .then(res => {
          // Valid login if we have a status of 2xx (res.ok)
          if (res.ok) {
            return res.json()
            // res.json().then((data) => {
            //   console.log(data);
            //   decodeBase64(data.audioContent);
            // })
            
          };
          throw new Error('Something is not OK');
        })
        
      } catch (err) {
        // Invalid user data (probably duplicate email)
        // setError(err.message)
        console.log(err.message);
      }

    }
    // base64 synthesize-output-base64.txt --decode > synthesized-audio.mp3
    // async function decodeBase64(input) {

    //   const outputFile = 'my-sound.mps';
    //   const writeFile = util.promisify(fs.writeFile);
    //   await writeFile(outputFile, input, 'binary');
    //   console.log(`Audio content written to file: ${outputFile}`);  

    // }

    return (
      <div>
        <h1>This is the homepage!</h1>
        <p>Where all of your bitcoin dreams can come true</p>
        <button onClick={processText}>SPEAK</button>
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