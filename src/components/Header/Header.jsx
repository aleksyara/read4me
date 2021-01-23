import React from 'react';
import {Link} from 'react-router-dom';
import { Header, Segment, Icon } from 'semantic-ui-react';


export default function PageHeader({user, handleLogout}){
  
    return (
      <Segment clearing>
            <h1>Page Header here...</h1>
            <Header as='h2' floated='right'>
                <Link to="/" onClick={handleLogout}><Icon name='home' size='small' /></Link>
                <Link to='/' onClick={handleLogout}>Logout</Link>
            </Header>
            <Header as='h2' floated='left'>
              <Link to={`/${user.username}`}></Link>  
              <p><Icon name='user' /> user? </p>
            </Header>       
          
      </Segment>
    )
}