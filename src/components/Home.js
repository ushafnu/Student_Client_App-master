import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import Search from './Search';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar/>
        <Container>
           <Search/>
        </Container>
      </div>
    );
  }
}

export default Home;