import React, { useState }from "react";
import { Container, Modal, Button, Icon } from "semantic-ui-react";
import { convertDateToString } from "./CalculatorUtils";


export default function InvalidDateModal(props){
    const [ iterator, increaseIterator   ] = useState(0);
    const datesArr = props.invalidDatesArr;
     
    const onModalSelection = (event) => {
        const id = event.target.id;
        const _ = event.target.value.split(",")

        console.log(`Value is ${_[0]}, Delta is ${_[1]}`);

        for(let i=0; i < datesArr.length; i++){
            if(datesArr[i].objId === id){
                for(let x=0; x < datesArr[i].invalidDate.length; x++){
                    const deltaDays = datesArr[i].invalidDate[x].diffInDays;
                };
            };
        };

        props.handleModalSelection(id, _[0]);
      
        if(iterator < datesArr.length-1){
          increaseIterator(iterator + 1);
        }else{
          props.handleModalClose(false);};
      };

    return(
        <Modal
        open={true}
        basic
        size='small'
      >
        <Container style={{ marginTop: "250px"}}>
            <div className="model-invalid-date">
                <Modal.Header>
                    <div class="ui large header" style={{ color: "white", marginBottom: "10px" }}>
                        <Icon name="calendar times outline" style={{ color: "white"}}/>Uh oh!...{datesArr[iterator].type} lands on a weekend or holiday. Please select the date you would prefer:
                    </div>             
                </Modal.Header>
            </div>
        <Modal.Content>
            <Modal.Actions>
                <Button active={true} 
                 color='blue' 
                 id={datesArr[iterator].objId} value={[datesArr[iterator].invalidDate[0].calculatedDate, datesArr[iterator].invalidDate[0].diffInDays]} 
                 onClick={onModalSelection}
                 style={{ width: "30%", marginBottom:"10px" }}
                >
                    {convertDateToString(datesArr[iterator].invalidDate[0].calculatedDate)}
                </Button>    

                <Button active={true} 
                 color='blue' 
                 id={datesArr[iterator].objId} value={[datesArr[iterator].invalidDate[1].calculatedDate, datesArr[iterator].invalidDate[1].diffInDays]} 
                 onClick={onModalSelection}
                 style={{ width: "30%", marginBottom:"10px" }}
                >
                    {convertDateToString(datesArr[iterator].invalidDate[1].calculatedDate)}
                    {String(datesArr[iterator].invalidDate[1].holiday)}
                </Button>   

                <Button active={true} 
                 color='blue' 
                 id={datesArr[iterator].objId} value={[datesArr[iterator].invalidDate[2].calculatedDate, datesArr[iterator].invalidDate[2].diffInDays]} 
                 onClick={onModalSelection}
                 style={{ width: "30%", marginBottom:"10px" }}
                >
                    {convertDateToString(datesArr[iterator].invalidDate[2].calculatedDate)}
                </Button>    

            </Modal.Actions>
            </Modal.Content>
            </Container>
        </Modal>
    );
}