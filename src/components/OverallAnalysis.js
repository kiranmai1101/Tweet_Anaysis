import React, { useState, useEffect } from "react";

import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import axios from 'axios'
import Chart from 'chart.js/auto';
import { div } from "react-bootstrap";
function OverallAnalysis(props) {

    return (
        <div>
            <div style={{ marginLeft: "20%", width: "50%", height: "70%" }}>
                
                {props.Overall_POI_vs_tweet_count &&
                <>
                <br/>
                <b style={{marginLeft:"12em"}}>Plot for Overall POI tweets Count</b>
                    <Bar data={props.Overall_POI_vs_tweet_count} />
                </>
                }
            </div>
            <div style={{ marginLeft: "30%", width: "30%" }}>
                {props.Overall_country_vs_tweet_count &&
                <>
                <br/>
                <b style={{marginLeft:"4em"}}>Plot for Overall tweets per country</b>
                    <Doughnut data={props.Overall_country_vs_tweet_count}></Doughnut>
                    </>
                }
            </div>
            <div style={{ marginLeft: "30%", width: "30%" }}>
                {props.Overall_language_vs_tweet_count &&
                <>
                <br/>
                <b style={{marginLeft:"4em"}}>Plot for Overall tweets per lanuage</b>
                    <Pie data={props.Overall_language_vs_tweet_count}></Pie>
                    </>
                }
            </div>


            <div style={{ marginLeft: "20%", width: "50%", height: "70%" }}>
                {props.p_n_sentiment &&
                <>
                <br/>
                <b style={{marginLeft:"12em"}}>Plot for sentiment on general population tweets </b>
                    <Bar data={props.p_n_sentiment} />
                    </>
                }

            </div> 
             <div style={{ marginLeft: "20%", width: "50%", height: "70%" }}>
                {props.p_n_political &&
                <>
                <br/>
                <b style={{marginLeft:"12em"}}>Plot for sentiment on overall political rhetoric analysis </b>
                    <Bar data={props.p_n_political} />
                </>
                }
            </div>
            <div style={{ marginLeft: "20%", width: "50%", height: "70%" }}>
                {props.p_n_v_info &&
                <>
                <br/>
                <b style={{marginLeft:"12em"}}>Plot for sentiment on Vaccine Hesistancy </b>
                    <Bar data={props.p_n_v_info} /></>
                }
            </div>
            <div style={{ marginLeft: "20%", width: "50%", height: "70%" }}>
            <>
                <br/>
                <b style={{marginLeft:"8em"}}>Plot for sentiment on persuasion against Vaccine Hesistancy </b>
                {props.v_hecitancy &&
                    <Bar data={props.v_hecitancy} />
                }
                </>
            </div>

        </div>
    )

}

export default OverallAnalysis;