
import React from 'react';
import logo from './logo.svg';
import "./App.css";
import {Table} from './Table';

import { BrowserRouter,Route,Routes,NavLink } from 'react-router-dom';
// import { Line } from "react-chartjs-2";
// import Chart from 'chart.js/auto';
import {Chart} from './Chart';
import moment from "moment";
import Plot from 'react-plotly.js';
import 'chartjs-plugin-streaming';
import * as mqtt from 'react-paho-mqtt';
import GaugeChart from 'react-gauge-chart';

import {
  BarChart,
  Bar,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';




function App() {
  const [ client, setClient ] = React.useState(null);
  const _topic = ["From S7-1500"];
  const _options = {};
  const [lsit,setlist]=React.useState([{"nhietdo":0,"time":0}]);
  const [asix,setAsix]=React.useState([1500,400]);

  React.useEffect(() => {
    _init();
  },[])

  const _init = () => {
    const c = mqtt.connect("192.168.1.200", Number(8000), "abc", _onConnectionLost, _onMessageArrived); // mqtt.connect(host, port, clientId, _onConnectionLost, _onMessageArrived)
    setClient(c);
  }

  const [ data, setdata ] = React.useState({

    nhietdo:0,
    time:0
});

  // const [dataPlot,setDataPlot]= React.useState({
  //   y: lsit,
  //           x: lsit1,
  //           type: 'scatter',
  //           mode: 'lines+markers',
  //           marker: {color: 'red'},
  // });
  // React.useEffect(() => {
  //     _onMessageArrived
  // });
  // called when sending payload
  const _sendPayload = () => {
    const payload = mqtt.parsePayload("From S7-1500", '{"nhietdo":"10"}'); // topic, payload
    client.send(payload);
  }

  // called when client lost connection
  const _onConnectionLost = responseObject => {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost: " + responseObject.errorMessage);
    }
  }

  // called when messages arrived
  const _onMessageArrived = message => {
    console.log("onMessageArrived: " + message.payloadString)
    let value = JSON.parse(message.payloadString)
    setdata(value)
  
  }


  // called when subscribing topic(s)
  const _onSubscribe = () => {
    client.connect({ onSuccess: () => {
      for (var i = 0; i < _topic.length; i++) {
        client.subscribe(_topic[i], _options);
      }}
    }); // called when the client connects
  }

  // called when subscribing topic(s)
  const _onUnsubscribe = () => {
    for (var i = 0; i < _topic.length; i++) {
      client.unsubscribe(_topic[i], _options);
    }
  }

  // called when disconnecting the client
  const _onDisconnect = () => {
    client.disconnect();
  }

  React.useEffect(() => {
   
    console.log(Date.now())
    lsit.push({"nhietdo":parseInt(data["nhietdo"]),"time":moment().format('YYYY/MM/D hh:mm:ss SSS')});
    setlist(lsit);
    if(asix[0]>1550){
      setAsix([asix[0]-10,asix[1]]);
    }
    else{
      setAsix([asix[0]+10,asix[1]]);
    }
      
  },[data])
  
  
  return (
    <div className="divName">
           <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">
          DASHBOARD
        </h3>
        
        <div className="diveName">
          <h4>
          Temperature chart
          </h4>
        </div>
        
        <div className="realTime" >
        {/* <GaugeChart id="gauge-chart2"
        arcPadding={0.01} 
        nrOfLevels={100} 
        percent={data["nhietdo"]/100}
        textColor="black"
        formatTextValue = {value => value+'°C'}
        style={{ width: '30%' }}
        
      /> */}
       <LineChart width={asix[0]} height={asix[1]} data={lsit} >
        <XAxis dataKey='time' />
        <YAxis />
        <Line dataKey='nhietdo' type="monotone" stroke="#82ca9d" />
       
      </LineChart>
        <button
            className="btn1"
            style={{height: '50px', width : '150px'}} 
            onClick={_onSubscribe}>
            <h4>Subscribe  </h4>
            </button>
            <button
            className="btn2"
            style={{height: '50px', width : '150px'}} 
            onClick={_sendPayload}>
            <h4>Publish  </h4>
        </button>

        </div>
        
        <div className="ChartCss">
          <Chart className="ChartCss"></Chart>
        </div>

        
        
        
        <div className="diveTableName">
          <h4>
          Data Table
          </h4> 
        </div>
        <Table className="TableCss"></Table>
        

      <Routes>
        <Route path='/table' element={<Table/>}/>
        <Route path='/chart' element={<Chart/>}/>
      </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
