import tokenService from './tokenService';

const BASE_URL = '/api/users/';

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Email already taken!');
  })
  // Parameter destructuring!
  .then(({token}) => tokenService.setToken(token));
  // The above could have been written as
  //.then((token) => token.token);
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
  .then(({token}) => tokenService.setToken(token));
}


function addToPlaylist(story){
  const user = getUser();
  return fetch(BASE_URL + `${user._id}/story`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(story)
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    };
    throw new Error('Something is not OK');
  });
}

async function getUserPlaylist(userid) {
  // create a GET request to load playlist that belongs to a user
  const user = getUser();
   
  const finalResult = await new Promise(function(resolve, reject) {
    fetch(BASE_URL + `${userid}/story`, {
      method: 'GET',
      headers: new Headers({'Content-Type': 'application/json'}),
    })
    .then(res => res.json())
    .then(result => {
      resolve(result);
    }, error => {
      reject(error);
    });
  })
  return finalResult;

}

export default {
  signup, 
  getUser,
  logout,
  login,
  addToPlaylist,
  getUserPlaylist,
};