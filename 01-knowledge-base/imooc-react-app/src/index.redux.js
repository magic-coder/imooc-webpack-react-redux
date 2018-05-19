import { createStore } from 'redux';

// define action
const ADD_GUN = 'add_gun';
const REDUCE_GUN = 'reduce_gun';

// action creator
export function addGun() {
 return {
  type: ADD_GUN
 };
}

export function reduceGun() {
 return {
  type: REDUCE_GUN
 };
}

// gun reducer
export const gunReducer = (state = 0, action) => {
 switch (action.type) {
  case ADD_GUN:
   return ++state;
  case REDUCE_GUN:
   return --state;
  default:
   return 10;
 }
}

// gun's store
export default createStore(gunReducer);