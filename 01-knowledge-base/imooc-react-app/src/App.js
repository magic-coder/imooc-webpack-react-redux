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
constructor(props) {
  super(props);
  this.state = {
    soldiers: ['lion', 'zhuzi', 'yugensheng']
  }
}

addSoldier = () => {
  console.log('hello add solider');
  this.setState({
    soldiers: [...this.state.soldiers, 'xingbingdanzi'+Math.random()]
  })
}

  render() {
    return (
      <div>
        <h2>YiYingYingZhang, {this.props.laoda}</h2>
        <button onClick={this.addSoldier}>Add Soldier</button>
        {
          <ul>
            {
              this.state.soldiers.map(v => <li key={v}>{v}</li>)
            }
          </ul>
        }
      </div>
    );
  };
}

export default App;
