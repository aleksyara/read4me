import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import InputForm from "../../components/InputForm/InputForm";
import PageHeader from '../../components/Header/Header';
import StoryFeed from '../../components/StoryFeed/StoryFeed';
import { Button, Input, Grid } from 'semantic-ui-react';
import soundService from '../../utils/soundService';
import { fs } from 'fs';
import util from 'util';
import base64 from 'react-native-base64';
import fsReact from 'fs-react';


// const style = <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css'/>

export default function Feed({user, handleLogout}) {
  const [location, setLocation] = useState(); //location is the url path to S3 bucket
    
  async function processText(e) {
    e.preventDefault();
    console.log("button was clicked*********");
    
  }

  async function readInputText(inputText) {
    console.log("This is a text we want to listen", inputText);
    //TODO: Make a request to our backend api
    const reponseFromProcessTextApi = await soundService.callProcessTextApi(inputText);
    if (reponseFromProcessTextApi && reponseFromProcessTextApi.location) {
       setLocation(reponseFromProcessTextApi.location);
    } 
    console.log("This is reponseFromProcessTextApi: ", reponseFromProcessTextApi);
  }
  
  return (
    <Grid centered >
    <Grid.Row>
      <Grid.Column>
        <PageHeader user={user}/>
        <h1>This is the homepage!</h1>
      </Grid.Column>
    </Grid.Row>
        <Grid.Row>
            <Grid.Column style={{maxWidth: 450}}>
              {/* <StoryFeed story={story} isProfile={false} user={user} /> */}
              <Button onClick={processText}>SPEAK</Button>
              <audio controls>
              <source src="{location}" type="audio/mpeg"></source>
              Your browser does not support the audio element.
              </audio>
            </Grid.Column>
        </Grid.Row> 
        <Grid.Row>
          <Grid.Column>
            <InputForm readInputText={readInputText}/>
          </Grid.Column>
        </Grid.Row>
  </Grid>
  )
};

