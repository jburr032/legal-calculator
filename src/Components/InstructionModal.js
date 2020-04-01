import React, { Component } from 'react';
import { Modal, Button, Icon, Label } from "semantic-ui-react";
 
class InstructionModal extends Component{
    state = { modalOpen: false }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    instructionBtn = (<div className="right menu">
                        <div className="item">
                            <Button style={{ backgroundColor: "#d10056",  color: "white", fontSize: "12px" }} onClick={this.handleOpen}>Help</Button>
                        </div>
                    </div>);

    render(){
        return(
            <Modal
                  trigger={this.instructionBtn}
                  open={this.state.modalOpen}
                  onClose={this.handleClose}
                  basic
                  size='small'
                >
                <div className="model-CPR-content">
                    {this.props.modalContent}
                </div>
                  
                  <Modal.Actions>
                    <Button color='green' onClick={this.handleClose} inverted>
                      <Icon name='checkmark' /> Got it
                    </Button>
                  </Modal.Actions>
                </Modal>
        )
    }

}

export default InstructionModal