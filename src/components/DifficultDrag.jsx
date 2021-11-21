import React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import ball10 from "../assets/football10.png"
import ball1 from "../assets/football1.png"
import rooster from "../assets/rooster.png"

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
import removeEffect from '../assets/sounds/removeItem.mp3'
import useSound from 'use-sound';
import bounce from '../assets/sounds/bouncingFootball.wav'
import dropSound from '../assets/sounds/drop.wav'
import "animate.css"
import { useEffect } from 'react';
// import _6  from '../assets/sounds/_6.mp3';
// import _6  from '../assets/sounds/_6.mp3';
// import _6  from '../assets/sounds/_6.mp3';
// import _6  from '../assets/sounds/_6.mp3';
// import _6  from '../assets/sounds/_6.mp3';
// import _6  from '../assets/sounds/_6.mp3';
// import _6  from '../assets/sounds/_6.mp3';
// import _6  from '../assets/sounds/_6.mp3';
// import _6  from '../assets/sounds/_6.mp3';
// import _6  from '../assets/sounds/_6.mp3';


const URLImage = ({ image, handleClick }) => {
    const [img] = useImage(image.src);

    return (
        <Image
            image={img}
            x={image.x}
            y={image.y}
            width={100}
            height={90}
            // I will use offset to set origin to the center of the image
            offsetX={img ? 100 / 2 : 0}
            offsetY={img ? 90 / 2 : 0}
            onClick={handleClick}
        />
    );
};

const DifficultDrag = (props) => {
    const dragUrl = React.useRef();
    const stageRef = React.useRef();
    const image = React.useRef();
    const [images, setImages] = React.useState([]);
    const [playRemoveEffect] = useSound(removeEffect)
    const [hover, setHover] = React.useState([false, false])
    const [bounceSound] = React.useState(new Audio(bounce))
    const [dropS] = React.useState(new Audio(dropSound))
    const [stageWidth, setStageWidth] = React.useState(300)
    const [stageHeight, setStageHeight] = React.useState(200)
    // const dragThis = React.useRef();
    const container = React.useRef();

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

    const playSoundEffect = (soundEffectIndex) => {
        console.log("i am at " + soundEffectIndex)
        if (soundEffectIndex < sounds.length) {
            sounds[soundEffectIndex].play();
        }
    }

    const toggleHover = (index, value) => {
        let temp = hover.slice();
        temp[index] = value
        setHover(temp)
    }


    var animate = "animate__animated animate__bounce"
    const checkSize = () => {
        const width = container.current.offsetWidth;
        const height = container.current.offsetHeight;
        console.log(container.current)
        setStageWidth(width)
        setStageHeight(height)
    };
    // const checkDrag = (event) => {
    //     if (event.targetTouches.length == 1) {
    //         var touch = event.targetTouches[0];
    //         // Place element where the finger is
    //         dragThis.current.left = touch.pageX + 'px';
    //         dragThis.current.top = touch.pageY + 'px';
    //     }
    // }
    useEffect(() => {
        checkSize();
        window.addEventListener("resize", checkSize);
        // dragThis.current.addEventListener('touchmove', checkDrag);

        return () => {
            window.removeEventListener("resize", checkSize)
            // dragThis.current.removeEventListener("touchmove", checkDrag)
        }
    }, [])


    return (
        <div className="noselect parentDiv" >

            <div

                onDrop={(e) => {
                    e.preventDefault();
                    // register event position
                    stageRef.current.setPointersPositions(e);
                    // add image
                    dropS.play()
                    setImages(
                        images.concat([
                            {
                                ...stageRef.current.getPointerPosition(),
                                src: dragUrl.current,
                                name: image.current
                            },
                        ])
                    );
                    if (image.current == "10") {
                        props.incCount(10)
                    }
                    else {
                        props.incCount(1)
                    }
                    // playSoundEffect(props.count)

                    //setCount(count + 1)
                }}
                onDragOver={(e) => e.preventDefault()}
                ref={container}
                className="dropBox"
            >
                <Stage
                    width={stageWidth}
                    height={stageHeight}
                    ref={stageRef}
                >
                    <Layer>
                        {images.map((im) => {
                            return <URLImage image={im} handleClick={() => {
                                console.log(im)
                                setImages(
                                    images.filter(item => item !== im)
                                )
                                playRemoveEffect()
                                if (im.name == "10") {
                                    props.decCount(10)
                                }
                                else {
                                    props.decCount(1)
                                }
                            }} />;
                        })}
                    </Layer>
                </Stage>

            </div>
            <div style={{ paddingLeft:"65px", display: "flex", flexWrap: "wrap" }}>
                <img
                    alt="lion"
                    name="10"
                    src={ball10}
                    draggable={props.count < 100 ? "true" : "false"}
                    onDragStart={(e) => {
                        dragUrl.current = e.target.src;
                        image.current = e.target.name
                    }}
                    className={"noselect draggableImage " + (hover[0] && animate)}
                    onMouseEnter={() => {
                        bounceSound.play()
                        toggleHover(0, true)
                    }}
                    onMouseLeave={() => {
                        bounceSound.pause();
                        bounceSound.currentTime = 0;
                        toggleHover(0, false)
                    }}
                />
                &nbsp;
                &nbsp;
                <img
                    alt="lion"
                    src={ball1}
                    name="1"
                    draggable={props.count < 100 ? "true" : "false"}
                    onDragStart={(e) => {
                        dragUrl.current = e.target.src;
                        image.current = e.target.name
                    }}
                    className={"noselect draggableImage " + (hover[1] && animate)}
                    onMouseEnter={() => {
                        bounceSound.play()
                        toggleHover(1, true)
                    }}
                    onMouseLeave={() => {
                        bounceSound.pause();
                        bounceSound.currentTime = 0;
                        toggleHover(1, false)
                    }}
                />

            </div>
            <br />
            <br />
            {/* <div>
                <h1>{props.count}</h1>
            </div> */}
        </div>
    );
};

export default DifficultDrag;
