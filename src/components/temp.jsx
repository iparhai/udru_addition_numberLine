import React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import useSound from 'use-sound';
import removeEffect from '../assets/sounds/removeItem.mp3'
import mango from '../assets/mango.png'
import { useEffect } from 'react';

import './drag.css'
import { Container } from 'konva/lib/Container';



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

const TempDrop = (props) => {
    const dragUrl = React.useRef();
    const stageRef = React.useRef();
    const container = React.useRef();
    const [images, setImages] = React.useState([]);
    const [playRemoveEffect] = useSound(removeEffect)
    const [hover, setHover] = React.useState(false)
    const [stageWidth, setStageWidth] = React.useState(300)
    const [stageHeight, setStageHeight] = React.useState(200)

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
        <div className="noselect " >
            <h1>adsfaf</h1>
            <br />
            <DragDropContainer targetKey="me"
            >

                <img
                    alt="lion"
                    src={mango}
                    className={"noselect draggableImage "}

                />
            </DragDropContainer>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="dropBox"
                ref={container}

            >
                <DropTarget targetKey="me"
                    className="dropBox"
                    onHit={() => {
                        console.log(images)
                        setImages(
                            images.concat([
                                {
                                    x: Math.random() * stageWidth,
                                    y: Math.random() * stageHeight,
                                    src: mango,
                                },
                            ])
                        );
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
                                    setImages(
                                        images.filter(item => item !== image)
                                    )

                                    //props.decCount(1)
                                }} />;
                            })}
                        </Layer>
                    </Stage>

                </DropTarget>
            </div>


            {/* <div >
                <img
                    alt="lion"
                    
                    src={props.img}
                    draggable={props.count < 10 ? "true" : "false"}
                    onDragStart={(e) => {
                        dragUrl.current = e.target.src;
                    }}
                    className={"noselect draggableImage " + animate}
                />
            </div>
            <br />
            <br /> */}
            {/* <div

                onDrop={(e) => {
                    e.preventDefault();
                    // register event position
                   
                    stageRef.current.setPointersPositions(e);
                    // add image

                    setImages(
                        images.concat([
                            {
                                ...stageRef.current.getPointerPosition(),
                                src: dragUrl.current,
                            },
                        ])
                    );

                    props.incCount(1)
                    playSoundEffect(props.count)

                    //setCount(count + 1)
                }}
                onDragOver={(e) => e.preventDefault()}
                className="dropBox"
            > */}


            {/* </div> */}
            {/* <div>
                <h1>{props.count}</h1>
            </div> */}
        </div >
    );
};

export default TempDrop;
