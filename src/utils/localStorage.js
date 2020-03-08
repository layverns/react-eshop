const KEY_TOKEN = 'KEY_TOKEN';
const KEY_CART = 'KEY_CART';

const tokenStorage = {
  save: token => window.localStorage.setItem(KEY_TOKEN, JSON.stringify(token)),
  load: () => JSON.parse(window.localStorage.getItem(KEY_TOKEN)),
};

const cartStorage = {
  save: cart => window.localStorage.setItem(KEY_CART, JSON.stringify(cart)),
  load: () => JSON.parse(window.localStorage.getItem(KEY_CART)),
};

export { tokenStorage, cartStorage };
