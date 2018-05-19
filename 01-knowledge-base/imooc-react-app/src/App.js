import React from 'react';

class App extends React.Component {
 render() {
  const store = this.props.store;
  const num = store.getState();
  return (
   <div>
    <h1>How many guns? {num}</h1>
    <button onClick={() => store.dispatch(this.props.addGun())}>Apply Gun</button>
    <button onClick={() => store.dispatch(this.props.reduceGun())}>Take Away Gun</button>
   </div>
  )
 }
}

export default App;
