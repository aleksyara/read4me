import React from 'react';
import {Link} from 'react-router-dom';
import { Header, Segment, Icon } from 'semantic-ui-react';


export default function PageHeader({user, handleLogout}){
  
    return (
      <Segment clearing>
            <Header as='h2' floated='right'>
                <Link to="/" ><Icon name='home' size='small' /></Link>
                <Link to='' onClick={handleLogout}>Logout</Link>
            </Header>
            <Header as='h2' floated='left'>
              <Link to={`/${user.username}`}></Link>  
              <p><Icon name='user' /> {user.name} </p>
            </Header>       
          
      </Segment>
    )
}