import React from 'react';
import './drag.css'
import _1 from '../assets/sounds/_1.mp3';
import _2 from '../assets/sounds/_2.mp3';
import _3 from '../assets/sounds/_3.mp3';
import _4 from '../assets/sounds/_4.mp3';
import _5 from '../assets/sounds/_5.mp3';
import _6 from '../assets/sounds/_6.mp3';
import _7 from '../assets/sounds/_7.mp3';
import _8 from '../assets/sounds/_8.mp3';
import _9 from '../assets/sounds/_9.mp3';
import _10 from '../assets/sounds/_10.mp3';
import numberLine from "../assets/numberLine.png"
import numberLineTwo from "../assets/numberLine2.png"
import movingFish_R from "../assets/movingFishR.gif"
import movingFish_L from "../assets/movingFishL.gif"
import more from "../assets/more.png"
import less from "../assets/less.png"
import { useEffect } from 'react';
// import fishSplash from './assets/sounds/fishSplash.wav'
import './NumberLineMove.css'
import sessionData from '../utils/sessionData';


const NumberLineMove = (props) => {


    const [fishLeft, setFishLeft] = React.useState(0)
    const [fishTwoLeft, setFishTwoLeft] = React.useState(0)
    const [fishTop, setFishTop] = React.useState(0)
    const [usedClicks, setUsedClicks] = React.useState(0)
    const [usedClicksTen_s, setUsedClicksTen_s] = React.useState(0)

    const [fishFacePosition, setFishFacePosition] = React.useState()
    const numberLineRef = React.useRef();
    const numberLineTwoRef = React.useRef();
    const buttonBackward = React.useRef();
    const buttonForward = React.useRef();
    const isBasic = sessionData.dif == "b" ? true : false
    const [currentSoundNumber, setCurrentSoundNumber] = React.useState(0);
    const isIntermediate = sessionData.dif == "i" ? true : false
    let a = 5
    const [sounds] = React.useState([
        new Audio(_1),
        new Audio(_2),
        new Audio(_3),
        new Audio(_4),
        new Audio(_5),
        new Audio(_6),
        new Audio(_7),
        new Audio(_8),
        new Audio(_9),
        new Audio(_10),

    ]);

    var fishStyle = {
        move: {
            position: "relative",
            float: "left",
            left: fishLeft + "px",
            top: fishTop + "px",

        }
    }
    var fishTwoStyle = {
        move: {
            position: "relative",
            float: "left",
            left: fishTwoLeft + "px",
            top: fishTop + "px",


        }
    }
    const checkResizeFish1 = () => {
        const nextForwardStep = numberLineRef.current.offsetWidth / 11

        setFishLeft(usedClicks * nextForwardStep)
    };
    const checkResizeFish2 = () => {
        const nextForwardStep = numberLineTwoRef.current.offsetWidth / 11

        setFishTwoLeft(usedClicksTen_s * nextForwardStep)
    };
    useEffect(() => {
        setFishFacePosition(movingFish_R)
        setFishLeft(numberLineRef.current.offsetLeft)
        setFishTop(0)
    }, [])

    useEffect(() => {
        window.addEventListener("resize", checkResizeFish1);
        return () => {
            window.removeEventListener("resize", checkResizeFish1)
        }
    }, [usedClicks])
    if (sessionData.dif != "b") {
        useEffect(() => {
            window.addEventListener("resize", checkResizeFish2);
            return () => {
                window.removeEventListener("resize", checkResizeFish2)
            }
        }, [usedClicksTen_s])
    }
    const moveForward = () => {
        if (usedClicks < 10) {
            const nextForwardStep = numberLineRef.current.offsetWidth / 11
            setFishLeft(fishLeft + nextForwardStep)
            setFishFacePosition(movingFish_R)
            setUsedClicks(usedClicks + 1)
            props.incCount(1)
            setCurrentSoundNumber(currentSoundNumber + 1)
            if (sessionData.dif == "b") {
                sounds[currentSoundNumber].play()
            }

        }
    }
    const moveBackward = () => {
        if (10 - usedClicks < 10) {
            const nextBackwardStep = numberLineRef.current.offsetWidth / 11
            setFishLeft(fishLeft - nextBackwardStep)
            setUsedClicks(usedClicks - 1)
            setFishFacePosition(movingFish_L)
            setCurrentSoundNumber(currentSoundNumber - 1)
            props.decCount(1)
        }
    }

    const moveForwardFish2 = () => {
        if (usedClicksTen_s < 10) {
            const nextForwardStep = numberLineTwoRef.current.offsetWidth / 11
            setFishTwoLeft(fishTwoLeft + nextForwardStep)
            setFishFacePosition(movingFish_R)
            setUsedClicksTen_s(usedClicksTen_s + 1)
            props.incCount(10)
        }
    }

    const moveBackwardFish2 = () => {
        if (10 - usedClicksTen_s < 10) {
            const nextBackwardStep = numberLineTwoRef.current.offsetWidth / 11
            setFishTwoLeft(fishTwoLeft - nextBackwardStep)
            setUsedClicksTen_s(usedClicksTen_s - 1)
            setFishFacePosition(movingFish_L)
            props.decCount(10)
        }
    }

    return (
        <div style={{ position: "relative" }}>
            <div className="nline" >
                <div className="firstBar"  >
                    <div >
                        <img src={less} alt="less" onClick={moveBackward} style={{ maxWidth: "50px", width: "100%" }} ref={buttonBackward} />
                    </div>
                    <div >
                        <img src={more} alt="more" onClick={moveForward} style={{ maxWidth: "50px", width: "100%" }} ref={buttonForward} />
                    </div>
                    <div className="parentImage" >
                        <img src={fishFacePosition} className="fish" alt="movingFish" style={fishStyle.move} />
                        <img src={numberLine} className="NumberLine" alt="numberLine" name="numberLine" ref={numberLineRef} /> 
                    </div>
                </div>

                {!isBasic &&
                    <div  className="secondBar"  >
                        <div >
                            <img src={less} alt="less" onClick={moveBackwardFish2} style={{ maxWidth: "50px", width: "100%" }} ref={buttonBackward} />
                        </div>
                        <div >
                            <img src={more} alt="more" onClick={moveForwardFish2} style={{ maxWidth: "50px", width: "100%" }} ref={buttonForward} />
                        </div>
                        <div className="parentImage" >
                            <img src={fishFacePosition} className="fish" name="fish" alt="movingFish" style={fishTwoStyle.move} />
                            <img src={numberLineTwo} className="NumberLine" alt="numberLine" name="numberLine"  ref={numberLineTwoRef} />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default NumberLineMove;



