import React from "react";
import { Grid, Transition } from "semantic-ui-react";
import { CprHoverContent, CprContent, CprMobileContent} from "./CprContent";

export default function CprColumn(props){
    const { cprMouseEnter, onMouseEnterCpr, onCprClick } = props;

    const handleCprClick = () => {
        onCprClick();
    };

    return( <>
                <Grid.Column 
                                className="homepage-option-style" 
                                computer={6}  
                                onMouseEnter={onMouseEnterCpr}
                                onMouseLeave={onMouseEnterCpr}
                                only={"computer"}
                                
                            >
                               <div onClick={handleCprClick}>  
                                    {cprMouseEnter && <Transition animation="slide up" visible={true} duration={800} transitionOnMount={true}>
                                                        <CprHoverContent /> 
                                                      </Transition> 
                                    }
                                 
                                    {!cprMouseEnter && <CprContent />}
                                </div>  
                                </Grid.Column> 

                        <Grid.Column 
                          onClick={onCprClick}
                          className="homepage-option-style" 
                          only={"mobile tablet"} tablet={6} mobile={8} 
                        >
                             {<CprMobileContent />}
                </Grid.Column> 


         </>               
    );
}