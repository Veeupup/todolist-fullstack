import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/app';
import About from './pages/about';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import client from './api';

const { Header, Footer, Content } = Layout;


function AppRouter() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Layout>
          <Header>
            <Menu theme="dark" mode="horizontal" defaultOpenKeys={['1']} style={{ lineHeight: '64px' }}>
              <Menu.Item key="1">
                <Link to="/">首页</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/about">关于</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/other">其他</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Layout>
            <Content style={{ padding: '30px 30px', minWidth: "300px" }}>
              <Route path="/" exact component={App} />
              <Route path="/about" exact component={About} />
            </Content>
          </Layout>
          <Footer style={{ textAlign: "center" }}> <a href="https://www.thoughtworks.com/">@thoughtworks</a> </Footer>
        </Layout>
      </Router>
    </ApolloProvider>
  )
}

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
