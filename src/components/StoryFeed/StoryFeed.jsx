import React from 'react';
import { Card  } from 'semantic-ui-react'
import StoryCard from '../StoryCard/StoryCard';


export default function StoryFeed({story, isProfile, user}){

    return (
        <Card.Group stackable>
            <StoryCard story={story} isProfile={isProfile} user={user} />
        </Card.Group>
    )
}