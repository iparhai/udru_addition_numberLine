import React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
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
import dropSound from '../assets/sounds/drop.wav'
import { useEffect } from 'react';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';


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
            width={90}
            height={70}
            // I will use offset to set origin to the center of the image
            offsetX={img ? 90 / 2 : 0}
            offsetY={img ? 70 / 2 : 0}
            onClick={handleClick}
            onTouchStart={handleClick}
        />
    );
};

const Drop = (props) => {
    const dragUrl = React.useRef();
    const stageRef = React.useRef();
    const draggableImage = React.useRef();
    const [images, setImages] = React.useState([]);
    const [playRemoveEffect] = useSound(removeEffect)
    const [hover, setHover] = React.useState(false)
    const [stageWidth, setStageWidth] = React.useState(300)
    const [stageHeight, setStageHeight] = React.useState(200)
    const [dropS] = React.useState(new Audio(dropSound))

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
        if (soundEffectIndex < sounds.length) {
            sounds[soundEffectIndex].play();
        }
    }
    const toggleHover = (value) => {
        setHover(value)
    }
    var animate;
    if (hover) {
        animate = "animate__animated animate__heartBeat"
    }
    else {
        animate = ""
    }
    const checkSize = () => {
        const width = container.current.offsetWidth;
        const height = container.current.offsetHeight;

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

            <div className="dropBox"
                ref={container}
            >
                <DropTarget targetKey="me"
                    onHit={() => {
                        console.log(images)
                        setImages(
                            images.concat([
                                {
                                    x: Math.random() * (stageWidth - 90) + 50,
                                    y: Math.random() * (stageHeight - 70) + 30,
                                    src: props.img,
                                },
                            ])
                        );
                        playSoundEffect(props.count)
                        props.incCount(1)
                    }}
                >

                    <Stage
                        width={stageWidth}
                        height={stageHeight}
                        ref={stageRef}
                    >

                        <Layer>

                            {images.map((image) => {
                                return <URLImage image={image} handleClick={() => {
                                    console.log("adf")
                                    setImages(
                                        images.filter(item => item !== image)
                                    )
                                    playRemoveEffect()
                                    props.decCount(1)
                                }} />;
                            })}
                        </Layer>
                    </Stage>

                </DropTarget>
            </div>
            {props.count < 10 ? <DragDropContainer targetKey="me"
                onDrop={(e) => {
                    console.log(e.dropData.name)
                }}
            >

                <img
                    alt="lion"
                    src={props.img}
                    className={"noselect draggableImage "}

                />
            </DragDropContainer> : <h4> Remove 1 to get 1</h4>}
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    );
};

export default Drop;



// <br />
// <div
//     onDrop={(e) => {
//         e.preventDefault();
//         // register event position
//         stageRef.current.setPointersPositions(e);
//         // add image
//         dropS.play()
//         setImages(
//             images.concat([
//                 {
//                     ...stageRef.current.getPointerPosition(),
//                     src: dragUrl.current,
//                 },
//             ])
//         );
//         props.incCount(1)
//         playSoundEffect(props.count)
//         //setCount(count + 1)
//     }}
//     ref={container}
//     onDragOver={(e) => e.preventDefault()}
//     className="dropBox"
// >
//     <Stage
//         width={stageWidth}
//         height={stageHeight}
//         ref={stageRef}
//     >
//         <Layer>
//             {images.map((image) => {
//                 return <URLImage image={image} handleClick={() => {
//                     setImages(
//                         images.filter(item => item !== image)
//                     )
//                     playRemoveEffect()
//                     props.decCount(1)
//                 }} dropImage={draggableImage} />;
//             })}
//         </Layer>
//     </Stage>

// </div>
// <div >
//     <img
//         alt="lion"

//         src={props.img}
//         draggable={props.count < 10 ? "true" : "false"}
//         onDragStart={(e) => {
//             dragUrl.current = e.target.src;
//         }}

//         className={"noselect draggableImage " + animate}
//         onMouseEnter={() => { toggleHover(true) }}
//         onMouseLeave={() => { toggleHover(false) }}
//         ref={draggableImage}
//     // ref={dragThis}
//     />
// </div>
// <br />
// <br />
// {/* <div>
//     <h1>{props.count}</h1>
// </div> */}