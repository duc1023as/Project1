
import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Table} from './Table';

import { BrowserRouter,Route,Routes,NavLink } from 'react-router-dom';
import { Line ,Bar} from "react-chartjs-2";
import Chart from 'chart.js/auto';
import moment from "moment";
import Plot from 'react-plotly.js';
import 'chartjs-plugin-streaming';
import * as mqtt from 'react-paho-mqtt';




function App() {
  const [ client, setClient ] = React.useState(null);
  const _topic = ["From S7-1500"];
  const _options = {};
  const _temp=['0','1000','2000'];
  const _temp1=['0','1000','2000'];
  const [lsit,setlist]=React.useState(['0']);
  const [lsit1,setlist1]=React.useState(['0']);

  React.useEffect(() => {
    _init();
  },[])

  const _init = () => {
    const c = mqtt.connect("broker.hivemq.com", Number(8000), "abc", _onConnectionLost, _onMessageArrived); // mqtt.connect(host, port, clientId, _onConnectionLost, _onMessageArrived)
    setClient(c);
  }

  const [ data, setdata ] = React.useState({

    nhietdo:10,
    time:0
});

  const [dataPlot,setDataPlot]= React.useState({
    y: lsit,
            x: lsit1,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
  });
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
    const newList = lsit.push(value["nhietdo"])
    setlist(newList)
    const newList1 = lsit1.push(value["time"])
    setlist1(newList1)
    console.log(lsit)
    console.log(lsit1)
    setDataPlot({
      y: lsit,
      x: lsit1,
      type: 'scatter',
      mode: 'lines+markes',
      marker: {color: 'red'},
    })
    console.log(dataPlot)
  
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

  const topic = {
    datasets: [
      {
        label: "Dataset",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: false,
        lineTension: 0,
        borderDash: [8, 4],
        data: []
      }
    ]
  };

  const options = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      xAxes: 
        {
          type: "realtime",
          distribution: "linear",
          realtime: {
            onRefresh: (chart) =>{
              chart.topic.datasets.forEach((dataset) => {
                dataset.data.push({
                  x: Date.now(),
                  y: Math.random(),
                });
              });
            },
            delay: 3000,
            time: {
              displayFormat: "h:mm"
            }
          },
          ticks: {
            displayFormats: 1,
            maxRotation: 0,
            minRotation: 0,
            stepSize: 1,
            maxTicksLimit: 30,
            minUnit: "second",
            source: "auto",
            autoSkip: true,
            callback: function(value) {
              return moment(value, "HH:mm:ss").format("mm:ss");
            }
          }
        }
      ,
      yAxes: 
        {
          ticks: {
            beginAtZero: true,
            max: 1
          }
        }
    }
  };
  
  
  return (
    <div>
          <button
            id = "btn1"
            onClick={_onSubscribe}>
            <h1>Subscribe Topic  </h1>
            </button>
            <button
            id = "btn2"
            onClick={_sendPayload}>
            <h1>Send Message </h1>
            </button>
            {/* <Line data={{
        labels:["Total Income"],
        datasets:[{
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data:[data["nhietdo"]]
    
        }]
    }}
    
    options={{
            title:{
              display:true,
              text:'Income',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            },
            
          }}

 />         */}
 {/* <Plot
        data={[dataPlot]}
        // onInitialized={(figure) => setState(figure)}
        // onUpdate={(figure) =>setState(figure)}
      /> */}
 
{/* <Line data={topic} options={options} /> */}
    </div>
  );
}

export default App;
