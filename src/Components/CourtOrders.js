import React, { Component } from "react";
import { Icon, Modal, Header, Grid, Container, Portal  } from "semantic-ui-react";
import Calendar from "react-calendar";
import CourtOrderForm from "./CourtOrderForm";
import "./styles.css";

export default class CourtOrdersApp extends Component{
    state = {
        date              : new Date(),
        courtOrderObjArr  : [],    
        modalOpen         : false,
        calendarDisabled  : false,
        fetchedHolidaysInMs : this.props.fetchedHolidaysInMs,
    };

    courtOrderModalContent = <>
                                <div className="ui large header" style={{ color: "white" }}>
                                    <Icon name="browser" style={{ color: "white" }}/>Court Order Dates
                                </div>
                                    <Modal.Content>
                                        <ol>
                                            <li>Select your date on the calendar</li>
                                        <br/>
                                            <li>Enter the length of any extension</li>
                                        <br/>
                                            <li>Click 'Calculate'</li>
                                        <br/>
                                            <li>The date of Service and when the Acknowledgement, Defence and Extension is due will be displayed below</li>
                                        <br/>
                                            <li>Select another date to restart</li>
                                        </ol>
                                    </Modal.Content>
                             </>;

    calendarHeaderStyle = {
        fontFamily: "Poppins",
        fontSize: "2.3em",
        textAlign: "center"
    };
    
    componentDidMount() {
        this.props.updateModalContent(this.courtOrderModalContent);  
      };

    handleDayClick = date => this.setState({ modalOpen: true, calendarDisabled: true, date });

    handleModalClose = () => this.setState({ modalOpen: false, calendarDisabled: false });

    onSubmit = (courtOrderObj) => { 
         // Create a copy of each object and array from state
         const courtOrderObjArr = this.state.courtOrderObjArr.map(obj => Object.assign({}, obj));
         
         courtOrderObjArr.push(courtOrderObj);
         
         this.setState({ courtOrderObjArr });
        
    };

    onDeleteClick = (event) => {
        const clickedLegalEvent = event.target.id;
        let updatedCourtOrderObjArr = this.state.courtOrderObjArr;
        
        updatedCourtOrderObjArr = updatedCourtOrderObjArr.filter((courtOrderObj) => courtOrderObj.objId !== clickedLegalEvent);

        this.setState({ courtOrderObjArr: updatedCourtOrderObjArr });
    };
    
    render(){
        
        const open = this.state.modalOpen;
        const dashboardContainerStyle = {width: "950px", padding: "3.5%"};
        
         const showUserInputs = this.state.courtOrderObjArr.map((courtOrderObj) => <LegalEventItem courtOrderObj={courtOrderObj} deleteClick={this.onDeleteClick} />);             
            
        return(
            <Container style={dashboardContainerStyle}>
                <Grid stackable centered columns={2} divided>
                    <Header style={this.calendarHeaderStyle} size="large">
                            Court Order
                    </Header>
                <Grid.Row>
                    
                    <Grid.Column width={10}>
                        <Calendar 
                          value={this.state.date}
                          onClickDay={this.handleDayClick}
                          tileDisabled={() => this.state.calendarDisabled}
                        /> 
                        <Portal onClose={this.handleClose} open={open}>
                            {<CourtOrderForm
                                date={this.state.date}
                                onModalOpen={open}
                                onModalClose={this.handleModalClose}
                                calendarDisabled={this.state.calendarDisabled}
                                handleSubmit={this.onSubmit}
                                fetchedHolidaysInMs={this.props.fetchedHolidaysInMs}
                            />}
                        </Portal>
                    </Grid.Column>

                    <Grid.Column width={6}>
                            {showUserInputs}
                    </Grid.Column>
                </Grid.Row>
             </Grid>
            </Container>
        )
    }
}

function LegalEventItem(props){
    const { courtOrderObj, deleteClick }= props;

    return(
        <div className="ui feed">
              <div className="event" >                                    
                 <div className="content" style={{ width: "100%" }}>      
                        <div className="summary"> 
                            <i aria-hidden="true" class="law icon"></i>                        
                                 {courtOrderObj.eventName}
                            <i aria-hidden="true" className="remove-event delete icon " id={courtOrderObj.objId} onClick={deleteClick} style={{ float: "right", }}></i>
                        </div>
                        <div className="summary">Due on {courtOrderObj.calculatedDate}</div>
                            <div className="text extra">
                                {courtOrderObj.numDays/86400000} days before {courtOrderObj.selectedDate}
                                <br />
                                {courtOrderObj.clearDays ? <div class="ui red label">Clear Days</div> : null}
                            </div>
                        </div>
                    </div>
            </div> 
    );
}