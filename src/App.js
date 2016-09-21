/* @flow */
import React, { Component } from 'react';
import Answers from './answers.js';
import Clock from './clock.js';
import gamelogic from './gamelogic.js';
import GuessLabel from './correctguesseslabel.js';
import { Jumbotron, Grid, Row, Col, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'animate.css/animate.css';

gamelogic.newGame();

class App extends Component {
  render() {
      return (
          <Grid>
              <Jumbotron>
                  <h1>Hvad er klokken?</h1>
              </Jumbotron>
              <Row>
                  <Col md={ 6 }>
                      <Clock />
                  </Col>
                  <Col md={ 6 }>
                      <Answers />
                      <div>
                          <GuessLabel />
                      </div>
                      <div>
                          <Button bsStyle="primary" onClick={gamelogic.newGame}>Nyt spil</Button>
                      </div>
                  </Col>
              </Row>
          </Grid>
      );
  }
}

export default App;
