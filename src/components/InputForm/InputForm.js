import React, { useState } from "react";
import { Icon } from 'semantic-ui-react';
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="story name"
        value={newStory.title}
        name="title"
        onChange={handleInput}
      />
      <textarea
        type="text"
        placeholder="paste your text here"
        value={newStory.description}
        name="description"
        onChange={handleInput}
      />
      <button>Add to Story <Icon rotated='clockwise' name='add' /></button>
      <div>
    
    </div>
    </form>
  );
}
