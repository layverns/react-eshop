const KEY_TOKEN = 'KEY_TOKEN';
const KEY_CART = 'KEY_CART';

const tokenStorage = {
  save: token => window.localStorage.setItem(KEY_TOKEN, JSON.stringify(token)),
  load: () => JSON.parse(window.localStorage.getItem(KEY_TOKEN)),
};

const cartStorage = {
  save: carts => window.localStorage.setItem(KEY_CART, JSON.stringify(carts)),
  load: () => JSON.parse(window.localStorage.getItem(KEY_CART)),
};

export { tokenStorage, cartStorage };
