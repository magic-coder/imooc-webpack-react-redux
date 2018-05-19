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

export function addGunAsync() {
  return (dispatch, getState) => {
    const num = getState();
    if (num < 10) {
      setTimeout(()=>{
        dispatch(addGun());
      }, 2000);
    } else {
      console.log(num);
    }
  }
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
