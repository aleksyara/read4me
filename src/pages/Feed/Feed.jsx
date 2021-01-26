import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import InputForm from "../../components/InputForm/InputForm";
import PageHeader from '../../components/Header/Header';
import StoryFeed from '../../components/StoryFeed/StoryFeed';
import { Button, Image, Grid, Card, Icon } from 'semantic-ui-react';
import AudioPlayer from 'react-h5-audio-player';
import ReactPlayer from 'react-player'
import 'react-h5-audio-player/lib/styles.css';
import { fs } from 'fs';
import util from 'util';
import base64 from 'react-native-base64';
import fsReact from 'fs-react';
import userService from '../../utils/userService';

import logo from '../../utils/img/read4me-logo.png';

export default function Feed({user, handleLogout}) {
  
  const [location, setLocation] = useState(); //location is the url path to S3 bucket with mp3 file
  const [playlist, setPlaylist] = useState();
  
  useEffect(() => {
    userService.getUserPlaylist(user._id).then(data => {
      setPlaylist(data);
    });   
  }, []);

  async function addToPlaylist(story){
    try {
      // Add story to the PlaylistSchema
      const addToPLaylistResult = await userService.addToPlaylist(story);
      setPlaylist([...playlist, story]);
    } catch (err) {
      console.log(err);
    }
  }

  async function removeFromPlaylist(e) {
    // TODO finish delete functionality
    try {
      console.log('&&**************');
      console.log('e', e);
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <Grid centered >
    <Grid.Row>
      <Grid.Column>
        <PageHeader user={user} handleLogout={handleLogout} />
          <Image src={ logo } size='medium' centered />
      </Grid.Column>
    </Grid.Row>
        <Grid.Row centered>
            <Grid.Column style={{maxWidth: 450}}>
            </Grid.Column>
        </Grid.Row> 
        <Grid.Row>

          <Grid.Column>
           <InputForm addToPlaylist={addToPlaylist}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row >
          <Grid.Column>           
          {
          playlist && playlist.length ?
            playlist.map((story, index) => {
                
                  return ( 
                    
                    <Card fluid color='orange' key={index} centered >
                      <Card.Header >
                        {story.title}
                        <Icon name="trash alternate"  onClick={() => removeFromPlaylist(story)}/>
                      </Card.Header>
                      <Card.Content description={story.description} />
                      <Card.Content extra>
                        <AudioPlayer
                          // autoPlay
                          src={story.location}
                          onPlay={e => console.log("onPlay")}/>
                      </Card.Content>
                    </Card>
                  )
                })
                :
                <p>No stories</p>        
          }
          </Grid.Column>
        </Grid.Row>
  </Grid>
  )
};

