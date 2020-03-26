import React from "react";

export function CprHoverContent(props){
    return(
            <>
                         <div 
                             className="homepage-option" 
                            style={{ fontSize: "150%", fontFamily: "Poppins", paddingTop: "10px", textAlign: "Center"}}
                           
                         >
                            Calculate Dates For
                        </div>
                    <div 
                        className="homepage-option" 
                       style={{ fontSize: "240%", fontFamily: "Poppins", textAlign: "Center", paddingTop: "15px"}}
                     >
                         Civil Procedure <br/>
                    <div style={{ marginTop: "10px"}}>
                        Rules
                    </div>
                </div>
                                    
            </>
    );
    
};

export function CprContent(props){
    return(
                 <>
                                <div 
                                 className="homepage-option" 
                                 style={{ fontSize: "150%", fontFamily: "Poppins", paddingTop: "10px", textAlign: "Center"}}
                                >
                                    <br />               
                                </div>
                                <div 
                                 className="homepage-option" 
                                 style={{ fontSize: "240%", fontFamily: "Poppins", textAlign: "Center", paddingTop: "15px"}}
                                >
                                    Civil Procedure <br/> <div style={{ marginTop: "10px"}}>Rules</div>
                                </div>
                </>
    );
}

export function CprMobileContent(props){
return(
        <>
         <div 
           className="homepage-option" 
           style={{ fontSize: "150%", fontFamily: "Poppins", paddingTop: "10px", textAlign: "Center"}}
          >
             Calculate Dates For
          </div>
          <div 
            className="homepage-option" 
            style={{ fontSize: "240%", fontFamily: "Poppins", textAlign: "Center", paddingTop: "15px"}}
           >
             Civil Procedure <br/>
           <div style={{ marginTop: "10px"}}>
                Rules
            </div>
         </div>
        </>
    );
}