import { createStore } from 'redux';

const bulletReducer = (state = 0, action) => {
 switch (action.type) {
  case "add":
   return ++state;
  case "subtract":
   return --state;
  default:
   return 10;
 }
}
const store = createStore(bulletReducer);
store.subscribe(function(){
  console.log("bullet number=", store.getState());
});


store.dispatch({type: "add"})
store.dispatch({type: "add"});
store.dispatch({type: "subtract"});
store.dispatch({type: "subtract"});
