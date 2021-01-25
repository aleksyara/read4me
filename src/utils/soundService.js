

const BASE_URL = '/api/users/';

function callProcessTextApi(text) {
  
  const BASE_URL = '/api/sounds/';
  const requestBody = {text: text};
  return fetch(BASE_URL, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(requestBody)
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    };
    throw new Error('Something is not OK');
  });
}

export default {
  callProcessTextApi
};