import React, { useState } from "react";
import { Icon, Form, Button } from 'semantic-ui-react';
import soundService from '../../utils/soundService';

export default function InputForm(props) {

  const [newStory, setNewStory] = useState({
    title: "",
    description: "",
  });

  function handleInput(e) {
    e.persist();
    setNewStory({
      ...newStory,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault(); //  <--prevent refreshing the page
    e.persist();
    const reponseFromProcessTextApi = await soundService.callProcessTextApi(newStory.description);
    if (reponseFromProcessTextApi && reponseFromProcessTextApi.location) {
      const finalNewStory = Object.assign(newStory, { location: reponseFromProcessTextApi.location });
      props.addToPlaylist(finalNewStory);
    }
    
    setNewStory({
      title: "",
      description: "",
    });
  }



  return (
    <Form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Story name"
        value={newStory.title}
        name="title"
        onChange={handleInput}
      />
      <textarea
        type="text"
        placeholder="Paste your text here"
        value={newStory.description}
        name="description"
        onChange={handleInput}
      />
      <Form.Button content='Add to Story' >Add to Story <span><Icon rotated='clockwise' name='add' /></span> 
      </Form.Button>
    </Form>
  );
}
