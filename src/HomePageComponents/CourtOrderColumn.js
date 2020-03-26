import React from "react";
import { Grid, Transition } from "semantic-ui-react";
import { CourtOrderHoverContent, CourtOrderContent, CourtOrderMobileContent } from "./CourtOrderContent";

export default function CourtOrderColumn(props){
    const { courtOrderMouseEnter, onMouseEnterCourtOrder, onCourtOrderClick } = props;

    const handleCourtOrderClick = () => {
        onCourtOrderClick();
    };

    return(
        <>
            <Grid.Column  
                         className="homepage-option-style" 
                         computer={6}  
                         onMouseEnter={onMouseEnterCourtOrder}
                         onMouseLeave={onMouseEnterCourtOrder}
                         only={"computer"}
                         onClick={handleCourtOrderClick}
                         >
                                    {courtOrderMouseEnter && <Transition animation="slide up" visible={true} duration={800} transitionOnMount={true}>
                                                                <CourtOrderHoverContent />
                                                             </Transition>  
                                    }

                                    {!courtOrderMouseEnter && <CourtOrderContent />}
                                   
            </Grid.Column>
                        
            <Grid.Column 
                          className="homepage-option-style" 
                          only={"mobile tablet"} tablet={6} mobile={8} 
                          onClick={onCourtOrderClick}
                        >
                             {<CourtOrderMobileContent />}
            </Grid.Column>
        </>
    );
}