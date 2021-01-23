import React, { useState } from "react";
import { Icon } from 'semantic-ui-react';

export default function InputForm(props) {

  const [inputText, setInputText] = useState();

  function handleInput(e) {
    e.persist();
    console.log("e.target.value", e.target.value);
    setInputText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(); //  <--prevent refreshing the page
    e.persist();
    console.log("inputText: ", inputText);
    props.readInputText(inputText);
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        type="text"
        placeholder="paste your text here"
        value={inputText}
        name="inputText"
        onChange={handleInput}
      />
      <button>submit</button>
      <Icon name='play' size='small' />
    </form>
  );
}
