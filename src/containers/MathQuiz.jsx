import React from 'react';
import Beginning from "../components/Beginning";
import Quiz from "../components/Quiz";
import Done from "../components/Done";
import Timmer from '../components/Timmer';
import Lifes from '../components/Lifes'
import Points from '../components/Points'
import "./MathQuiz.css"
import TableScore from '../components/TableScore';
import Hints from '../components/Hints';
import grocerySound from '../assets/sounds/grocerySound.mp3'

class MathQuiz extends React.Component {
  state = {
    isBeginningDone: false,
    lastPoints: 0,
    sound: new Audio(grocerySound),
    mute: false
  };

  retryGame = () => {
    this.setState({ isBeginningDone: false })
    this.props.onRetryGame();
  }

  completeBeginning = () => {
    this.setState({ isBeginningDone: true });
  };
  handleSoundClick = () => {
    if (!this.state.sound.paused) {
      this.state.sound.pause()
      this.setState({
        mute: true
      })
    }
    else if (this.state.sound.paused) {
      this.state.sound.play()
      this.setState({
        mute: false
      })
    }
  }
  componentDidMount() {
    this.state.sound.play()
  }

  render() {
    return !this.props.isFinished ? (
      <div>
        {!this.state.isBeginningDone ? (
          <Beginning isComplete={this.completeBeginning} />
        ) : (
          <div className="noselect ">
            {/* <img src={this.state.images.map()} alt="learning" /> */}
            <div className="App-header-bar">
              <span onClick={this.handleSoundClick}>
                {this.state.mute ? <i className="fas fa-volume-mute" /> : <i className="fa fa-volume-up " />}
              </span>
              <Timmer {...this.props} />
              <Lifes {...this.props} />
              <Points {...this.props} />
              <Hints />
            </div>
            <div>
              <Quiz {...this.props} />
            </div>
          </div>
        )}
      </div>
    ) : (
      <Done {...this.props} retryGame={this.retryGame} >
        <TableScore {...this.props} />

      </ Done>
    );
  }
}

export default MathQuiz;