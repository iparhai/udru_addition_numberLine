import React from 'react'
import PropTypes from 'prop-types'
import sessionData from "../utils/sessionData.js"


class Timmer extends React.Component {

    _secondsIntervalRef;

    constructor(props) {
        super(props);
        this.state = {
            seconds: this.props.seconds,
            level: this.props.level,
            limit: 0,
            totalProblems: 1
        }
    }

    componentDidMount() {
        this.setState({
            seconds: this.props.seconds,
            limit : sessionData.limit
        });
        this._secondsIntervalRef = setInterval(() => this.setState(prevState => ({
            seconds: --prevState.seconds
        })), 1000)
    }
    componentDidUpdate() {
        if (this.props.level !== this.state.level) {
            sessionData.setDataTime(300 - this.state.seconds)
            this.setState(prevState => ({
                level: this.props.level,
                //seconds: prevState.seconds + 20,
                totalProblems: this.state.totalProblems + 1,
                seconds: 300

            }));

            this.props.setTimeChanged(this.state.seconds);
        }

        // if (this.state.seconds < 0 || this.state.totalProblems > this.state.limit) {
        //     this.props.onEndGame(this.props.points);
        // }
    }

    componentWillUnmount() {
        clearInterval(this._secondsIntervalRef);
    }

    render() {
        return (
            <span>
                {/* <i className="fas fa-clock"></i> <b>{ this.state.seconds }</b> */}
                <b> {this.state.totalProblems}/{this.state.limit} </b>
            </span>
        )
    }

    timeTaken() {
        return 20 - this.state.seconds
    }
}

Timmer.propTypes = {
    seconds: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
}

Timmer.defaultProps = {
    level: 0
}

export default Timmer;