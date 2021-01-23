import React, { useState, useEffect } from 'react';
import { Grid, Segment, Dimmer, Loader } from 'semantic-ui-react'
import userService from '../../utils/userService';
import PageHeader from '../../components/Header/Header';
// import ProfileBio from '../../components/ProfileBio/ProfileBio';
// import PostFeed from '../../components/PostFeed/PostFeed';
// import PageHeader from '../../components/Header/Header';
// import * as likesAPI from '../../utils/likesService';
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


    // async function addLike(postId) {
    //     try {
    //         const data = await likesAPI.create(postId);
    //         console.log(data, ' this is from addLike')
    //         getProfile()
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // async function removeLike(likeId) {
    //     try {
    //         const data = await likesAPI.removeLike(likeId);
    //         getProfile();
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }


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
