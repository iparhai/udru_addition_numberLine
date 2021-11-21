import React from "react";
import './Hints.css'
import onClickOutside from 'react-onclickoutside'
import instructionGIF from '../assets/gif/instructions.gif'
class Hints extends React.Component {
    wrapperRef = React.createRef();
    state = {
        problemHint: [{
            problem: '2+3',
            Hint: "علی نے آپ کو 3 روپے اور اسامہ نے آپ کو 2 روپے دیے۔ تو آپ کے پاس کل کتنے روپے ہیں؟"
        }],
        showHint: true,
        currentProblem: null,

    };
    handleClickOutside = () => {
        this.setState({
            showHint: false
        })
    }
    toggleHint(value) {
        this.setState({ showHint: value })
    }
    render() {
        return (
            // <div>
            //     <div>
            //         <div onClick={() => { this.toggleHint(!this.state.showHint) }} ><svg xmlns="http://www.w3.org/2000/svg" width="20%"  fill="currentColor" class="bi bi-info-square" viewBox="0 0 16 16">
            //             <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            //             <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            //         </svg></div>
            //     </div>
            //     <div >
            //         {this.state.showHint && <div class="thought "  style={{width  : "80vw", height : "80vh", marginLeft : "-50%"}}>{this.state.problemHint[0].Hint}</div>}
            //     </div>
            // </div>
            <div>
                <i onClick={() => { this.toggleHint(!this.state.showHint) }} className="fas fa-info"></i>
                <div >
                    {this.state.showHint &&
                        <div class="thought " onClick={() => { this.toggleHint(!this.state.showHint) }} style={{ top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.9)", color: "red", zIndex:5 }}>
                            <img src={instructionGIF} style={{
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                margin: "auto",
                                maxWidth: "800px",
                                width: "60%",
                                position: "absolute"
                            }} />
                        </div>}
                </div>
            </div>
        );
    }
}

export default onClickOutside(Hints);
