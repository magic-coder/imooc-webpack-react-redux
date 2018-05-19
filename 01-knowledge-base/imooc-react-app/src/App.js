import React from 'react';

class App extends React.Component {
  render() {
    const boss = '李云龙';
    return (
      <div>
        <h2>独立团{boss}</h2>
        <YiYing laoda='ZhangDaMiao' />
        <QiBingLian laoda='ZhangDaMiao' />
      </div>
    );
  }
}

function QiBingLian(props) {
  return <h2>QiBingLianLianZhang{props.laoda}, chonga!</h2>
}

class YiYing extends React.Component {
  render() {
    return <h2>YiYingYingZhang, {this.props.laoda}</h2>;
  };
}

export default App;
