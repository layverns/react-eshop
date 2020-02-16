


const KEY_TOKEN = 'KEY_TOKEN';

const tokenStorage = {
  save: (token) => window.localStorage.setItem(KEY_TOKEN, JSON.stringify(token)),
  load: ()  => JSON.parse(window.localStorage.getItem(KEY_TOKEN))
}

export {
  tokenStorage
}