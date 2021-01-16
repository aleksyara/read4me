import React from 'react';
// import {Link} from 'react-router-dom';
// import { Header, Segment, Image, Icon } from 'semantic-ui-react';


export default function PageHeader({user, handleLogout}){
    return (
        <div>
          <h1>This is PgeHeader!</h1>
        </div>
        // <Segment clearing>
        //     <Header as='h2' floated='right'>
        //         <Link to="/"><Icon name="home"></Icon></Link>
        //         <Link to='' onClick={handleLogout}>Logout</Link>
        //     </Header>
        //     <Header as='h2' floated='left'>
        //         <Link to={`/${user.username}`}></Link>          
        //     </Header>
        // </Segment>
    )
}