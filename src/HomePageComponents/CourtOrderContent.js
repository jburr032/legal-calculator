import React from "react";

export function CourtOrderHoverContent(props){
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
        Court <br/>
   <div style={{ marginTop: "10px"}}>
       Order
   </div>
</div>
                   
</>
    );
}

export function CourtOrderContent(props){
    return(<>
            <div 
               className="homepage-option" 
               style={{ fontSize: "150%", fontFamily: "Poppins", paddingTop: "10px", textAlign: "Center"}}
             >
                 <br />               
            </div>
            <div 
             className="homepage-option-style homepage-option" 
             style={{ fontSize: "240%", fontFamily: "Poppins", textAlign: "Center", paddingTop: "15px"}}>
                Court 
            <br/>
                <div style={{ marginTop: "10px"}}>
                    Order
                </div> 
            </div>
         </>  
    );
}

export function CourtOrderMobileContent(props){
    return(
        <>
         <div 
           lassName="homepage-option" 
           style={{ fontSize: "150%", fontFamily: "Poppins", paddingTop: "10px", textAlign: "Center"}}
          >
             Calculate Dates For
          </div>
          <div 
            className="homepage-option" 
            style={{ fontSize: "240%", fontFamily: "Poppins", textAlign: "Center", paddingTop: "15px"}}
           >
             Court Order
         </div>
        </>
    );
}