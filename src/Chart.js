import { tab } from '@testing-library/user-event/dist/tab';
import React,{Component,useState} from 'react';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ZAxis} from 'recharts';
import { variables } from './Variables';
import ComboBox from "react-responsive-combo-box";
import "react-responsive-combo-box/dist/index.css";
import "./App.css";



export class Chart extends Component{
    constructor(props){
        super(props);
        this.state={
            tables:[],
            selectedOption:"",
            setSelectedOption:""
        }
    }

    refreshList(beach="Montrose Beach"){
        if (beach != "All"){
        fetch(variables.API_URL+'Sensor/20,'+beach)
        .then(response=>response.json())
        .then(data=>{
            this.setState({tables:data});
        });}
        else{
        fetch(variables.API_URL+'Sensor/20')
        .then(response=>response.json())
        .then(data=>{
            this.setState({tables:data});
        });
        }
    }

    componentDidMount(){
        this.refreshList(this.setSelectedOption);
    }


    render(){
        const{
            tables,selectedOption,setSelectedOption
        }=this.state;
        const options = [
            '63rd Street Beach',
            'Calumet Beach',
            'Montrose Beach',
            'Ohio Street Beach',
            'Osterman Beach',
            'Rainbow Beach'
        ]
        if(this.setSelectedOption!="All"){
            return (
            
                <div>
                    <ComboBox
                        options={options}
                        placeholder="Choose Beach"
                        defaultIndex={4}
                        optionsListMaxHeight={300}
                        style={{
                        width: "350px",
                        // margin: "0 auto",
                        // marginTop: "50px"
                        }}
                        focusColor="#20C374"
                        renderOptions={(option) => (
                        <div className="comboBoxOption">{option}</div>
                        )}
                        onSelect={(option) =>{this.setSelectedOption=option;
                        this.componentDidMount(this.setSelectedOption)}
                        }
                        onChange={(event) => {
                            console.log(event.target.value);
                            }}
                        
                        enableAutocomplete
                    />
                    <h4>Temperature chart of  {this.setSelectedOption}</h4>
                    <ResponsiveContainer className="chart" height={300}>
                        <LineChart 
                        width={600} 
                        height={300} 
                        data={tables}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                        >
                        <XAxis label={{ value:"Time", offset:-5, position:"insideBottom" }}dataKey="Measurement_Timestamp_Label"></XAxis>/
                        <YAxis label={{ value: 'Temperature', angle: -90, position: 'insideLeft' }} dataKey="Water_Temperature"/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Line type="monotone" dataKey="Water_Temperature" stroke="#8884d8" activeDot={{r: 8}} dot={false} />
                    </LineChart>
                    </ResponsiveContainer>
                </div>
            );
        }
        else{
            return (
            
                <div>
                    <ComboBox
                        options={options}
                        placeholder="Choose Beach"
                        defaultIndex={4}
                        optionsListMaxHeight={300}
                        style={{
                        width: "350px",
                        // margin: "0 auto",
                        // marginTop: "50px"
                        }}
                        focusColor="#20C374"
                        renderOptions={(option) => (
                        <div className="comboBoxOption">{option}</div>
                        )}
                        onSelect={(option) =>{this.setSelectedOption=option;
                        this.componentDidMount(this.setSelectedOption)}
                        }
                        onChange={(event) => {
                            console.log(event.target.value);
                            }}
                        
                        enableAutocomplete
                    />
                    <h4>Temperature chart of {this.setSelectedOption}</h4>
                    <ResponsiveContainer className="chart" height={300}>
                        <LineChart 
                        width={600} 
                        height={300} 
                        data={tables}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                        >
                        <XAxis label={{ value:"Time", offset:-5, position:"insideBottom" }}dataKey={"Measurement_Timestamp_Label"}></XAxis>/
                        <YAxis label={{ value: 'Temperature', angle: -90, position: 'insideLeft' }} dataKey={"Water_Temperature"}/>
                        
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Line type="monotone" dataKey={"Water_Temperature"} stroke="#8884d8" activeDot={{r: 8}} dot={false} />
                        {/* <Line type="monotone" dataKey={"Calumet Beach"} stroke="#82ca9d" activeDot={{r: 8}} dot={false}/> */}
                        {/* <Line type="monotone" dataKey={"Montrose Beach"} stroke="#8884d7" activeDot={{r: 8}} dot={false}/>
                        <Line type="monotone" dataKey={"Ohio Street Beach"} stroke="#8884d6" activeDot={{r: 8}} dot={false}/>
                        <Line type="monotone" dataKey={"Osterman Beach"} stroke="#8884d5" activeDot={{r: 8}} dot={false}/>
                        <Line type="monotone" dataKey={"Rainbow Beach"} stroke="#8884d4" activeDot={{r: 8}} dot={false}/> */}
        
                    </LineChart>
    
                    </ResponsiveContainer>
                </div>
            );
        }

      }
    
    }