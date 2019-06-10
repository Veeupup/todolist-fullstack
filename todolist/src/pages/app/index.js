import React, { Component } from 'react';
import './index.css';
import { Layout, Menu } from 'antd';
import Board from '../../components/board';
import About from '../../components/about';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const { Header, Footer, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Header style={{ width: '100%' }}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/about/">About</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ minWidth: 1200, maxWidth: 1600, margin: '0 auto' ,padding: '30px 50px', textAlign: "center", }}>
            <div style={{ padding: '30px' ,background: '#fff' }}>
              <Route path="/" exact component={Board} />
              <Route path="/about/" exact component={About} />
            </div>
          </Content>
          <Footer style={{ textAlign: "center", }}>@thoughtworks</Footer>
        </Layout>
      </Router>
    )
  }

}

export default App;
