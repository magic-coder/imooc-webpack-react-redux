import React from 'react';
import { Button } from 'antd-mobile';
import { List } from 'antd-mobile';

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

  componentWillMount() {
    console.log('component will mount');
  }

  componentDidMount() {
    console.log('component did mount');
  }

  componentWillUnmount() {
    console.log('component will unmount');
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
        <Button type="primary" onClick={this.addSoldier}>Add Soldier</Button>
        <List renderHeader={()=>'soliders list'}>
          {
            this.state.soldiers.map(v => <List.Item key={v}>{v}</List.Item>)
          }
        </List>
      </div>
    );
  };
}

export default App;
