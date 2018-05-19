import React from 'react';

class App extends React.Component {
  render() {
    const boss = '李云龙';
    return (
      <div>
        <h2>独立团{boss}</h2>
        <YiYing />
      </div>
    );
  }
}

class YiYing extends React.Component {
  render() {
    const boss = 'ZhangDaMiao';
    return <h2>YiYingYingZhang, {boss}</h2>;
  };
}

export default App;
