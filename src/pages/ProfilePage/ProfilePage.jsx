import React, { useState, useEffect } from 'react';
import { Grid, Segment, Dimmer, Loader } from 'semantic-ui-react'
import userService from '../../utils/userService';
import PageHeader from '../../components/Header/Header';
import { useLocation } from 'react-router-dom';

export default function ProfilePage({ user, handleLogout }) {

    // const [posts, setPosts] = useState([])
    const [profileUser, setProfileUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const location = useLocation()
    console.log(location)

    async function getProfile() {

        try {

            const username = location.pathname.substring(1)
            // location.pathname returns /jimbo so we need to cut off the / using the js method substring
            // This gets the username from the url! 
            console.log(username)
            const data = await userService.getProfile(username);
            console.log(data)
            setLoading(() => false)
            // setPosts(() => [...data.posts])
            setProfileUser(() => data.user)
        } catch (err) {
            console.log(err)
            setError(err)
        }
    }


    useEffect(() => {
        getProfile()

    }, [])



    return (

        <>

                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <PageHeader user={user}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            
        </>
    )
}
