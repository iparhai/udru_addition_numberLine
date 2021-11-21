import React, { Component } from 'react';
import { connect } from "react-redux"
import { mapDispatchToProps, mapStateToProps } from './redux/index'
import Start from './containers/Start';
import MathQuiz from './containers/MathQuiz';
import './App.css';
import backgroundGIF from './assets/gif/background.gif'

import Footer from './components/Footer';
import sessionData from './utils/sessionData';
import grocerySound from './assets/sounds/grocerySound.mp3'
import Hints from './components/Hints';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
class App extends Component {
  state = {
    // sound: false,
    // curr: this.notPlayAudioWithVideo
  }
  gameStart = () => {
    this.props.onStartGame();
  }
  handleURL() {
    // const query = new URLSearchParams(this.props.location.search);
    // const token = query.get('id')
    // const queryParams = new URLSearchParams(window.location.search);
    // const id = queryParams.get('id');

    // alert(id)
  }
 
 
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {sessionData.dif == "b" ? <img src={backgroundGIF} id="bg" alt="" /> : <img src={backgroundGIF} id="bg" alt="" />}
          
          
          {
            !this.props.isStarted ? (
              <Start startPressed={this.gameStart} />
            ) : (
              <MathQuiz {...this.props} gameStart={this.gameStart} />
            )
          }
        </header>
        {/* <Footer></Footer> */}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
