import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Grid, Icon, Transition } from "semantic-ui-react";
import CalendarApp from "./CalendarApp";
import CprColumn from "./HomePageComponents/CprColumn";
import CourtOrderColumn from "./HomePageComponents/CourtOrderColumn";
import { convertDateToMs } from "./Components/CalculatorUtils";
import CprDashboard from "./Components/CprDashboard";
import CourtOrdersApp from "./Components/CourtOrders";


export default class CalendarHomePage extends Component{
    state = {
        cprMouseEnter               : false,
        courtOrderMouseEnter        : false,
        showCprPage                 : false,
        showCourtOrderPage          : false,
        showCprLoadingPage          : false,
        showCourtOrderLoadingPage   : false,
        fetchedHolidaysInMs         : null,
    };

    componentDidMount() {
        const endpoint = "https://www.gov.uk/bank-holidays.json";
        fetch(endpoint)
          .then(response => response.json())
          .then(data => this.handleDates(data["england-and-wales"].events));

      }
          
      handleDates = holiday => {
        let fetchedHolidaysInMs;
        const currYear = String(new Date().getFullYear());
     
        // Returns an array of objects with holiday info
        const fetchedHolidayObjs = holiday.filter(
          holiday => holiday.date.slice(0, 4) === currYear
        );
        // Assigns an array of holidays in MS
        fetchedHolidaysInMs = fetchedHolidayObjs.map(holiday =>
          convertDateToMs(holiday.date)
        );
    
        this.setState({ fetchedHolidaysInMs });
        //this.passFetchedHolidays(fetchedHolidaysInMs);
    
      };

    /*** CPR Methods and Content */
    onMouseEnterCPR = () => {
        this.setState({ 
            cprMouseEnter: !this.state.cprMouseEnter, 
            
        });
    };

    onMouseEnterCourtOrder = () => {
        this.setState({ 
            courtOrderMouseEnter: !this.state.courtOrderMouseEnter, 
        });
    };
    
    onCprClick = () => {
        this.setState({ showCprLoadingPage: !this.state.showCprLoadingPage });
        this.handleLoadingCpr();
    };
    
    onCourtOrderClick = () => {
        this.setState({ showCourtOrderLoadingPage: !this.state.showCourtOrderLoadingPage })
        this.handleLoadingCourtOrder();
    };

    handleLoadingCpr = () => {
        // Run an interval then turn off the loading screen
        setTimeout(() => {
            this.setState({ showCprLoadingPage: !this.state.showCprLoadingPage, showCprPage: !this.state.showCprPage });
          }, 3300);
      };
    
    handleLoadingCourtOrder = () => {
        setTimeout(() => {
            this.setState({ showCourtOrderLoadingPage: !this.state.showCourtOrderLoadingPage, showCourtOrderPage: !this.state.showCourtOrderPage });
        }, 3300)
    }


    render(){
       const dashboardContainerStyle = {width: "1250px", marginTop: "300px",};
       const {  showCprPage, 
                showCourtOrderPage, 
                cprMouseEnter, 
                courtOrderMouseEnter, 
                showCprLoadingPage, 
                showCourtOrderLoadingPage, 
                fetchedHolidaysInMs
        } = this.state;
       
       return(
           <div className="landing-page">
            {(showCprLoadingPage || showCourtOrderLoadingPage) && <LoadingCalendarPage 
                                                                   calendarStyling={{ 
                                                                       border: "solid #ffe0ed", 
                                                                       borderWidth: "20px" }}
                                                                  />}

           {!showCprLoadingPage && !showCourtOrderLoadingPage && (!showCprPage && !showCourtOrderPage) &&
           <Container style={dashboardContainerStyle}>       
                <Grid stackable centered>

                    <Grid.Row centered textAlign="center" verticalAlign="middle">
                          {<CprColumn
                            onCprClick={this.onCprClick}
                            cprMouseEnter= {cprMouseEnter}
                            onMouseEnterCpr= {this.onMouseEnterCPR}                          
                          />}  

                        <Grid.Column computer={1} tablet={2} only="computer tablet">
                            <div 
                             className="homepage-option" 
                             style={{ fontSize: "150%", fontFamily: "Poppins", paddingTop: "10px", textAlign: "Center"}}
                            >
                                <br />               
                            </div>
                            <Icon className="law-icon" name="law" style={{ fontSize: "375%", paddingTop: "50px", }}></Icon>
                        </Grid.Column>  

                        <Grid.Column mobile={2} only="mobile" style={{ fontSize: "375%", marginTop: "105px", }}>
                                <hr></hr>
                        </Grid.Column>

                        {<CourtOrderColumn
                            onCourtOrderClick={this.onCourtOrderClick}
                            courtOrderMouseEnter= {courtOrderMouseEnter}
                            onMouseEnterCourtOrder= {this.onMouseEnterCourtOrder}
                        />}
                    </Grid.Row>
                </Grid>
            </Container>}
            {(showCprLoadingPage || showCourtOrderLoadingPage) && <Container style={{width: "650px", padding: "3.5%"}}>
                                                                    <LoadingCalendarPage 
                                                                        calendarStyling={{ 
                                                                        marginTop: "100px",
                                                                        border: "solid #ffe0ed", 
                                                                        borderHeight: "390px", 
                                                                        borderWidth: "200px" }}
                                                                    />
                                                                  </Container>}
            {(showCprPage || showCourtOrderPage) && 
                                                    <CalendarApp
                                                      showCprPage={showCprPage}
                                                      showCourtOrderPage={showCourtOrderPage}
                                                      fetchedHolidaysInMs={fetchedHolidaysInMs}
                                                    />
                                                }
            
        </div>
        );
    };
};

export function LoadingCalendarPage(props){
    return (
       <> 
          <Transition
            transitionOnMount={true}
            animation="flash"
            visible={true}
            duration={5000}
            onShow={props.handleOnShow}
          >
            <div className="shadow-loading-screen">
                <div
                 style={props.calendarStyling}
                />
           </div>
          </Transition> 
      </>  
      );
};
