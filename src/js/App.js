import React from 'react';
// import Strapi from 'strapi-sdk-javascript/build/main';
import '../css/App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './views/pages/Home'
import RoomsList from './views/pages/rooms/RoomsList'
import Room from './views/pages/rooms/Room'
import { Layout } from 'antd';
import Header from './components/layout/Header'

// const strapi = new Strapi('http://localhost:1337');

const { Content } = Layout;

export default function App() {
  return (
    <div className="App">
      <Router>
        <Layout className="layout">
          <Header />
          <Content className="page-content">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/rooms" exact component={RoomsList} />
              <Route path="/rooms/:id" component={Room} />
            </Switch>
          </Content>
        </Layout>
      </Router>,
    </div>
  );
}

