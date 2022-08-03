import React,{Component} from 'react';
import { variables } from './Variables';
import ComboBox from "react-responsive-combo-box";
import "react-responsive-combo-box/dist/index.css";

export class Table extends Component{
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
            'All',
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
                <table className="table table striped">
                    <thead>
                        <tr>
                            <th>
                                Beach_Name
                            </th>
                            <th>
                                Water_Temperature
                            </th>
                            <th>
                                Measurement_ID
                            </th>
                            <th>
                                Measurement_Timestamp_Label
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tables.map(tab=>
                            <tr >
                                <td>
                                    {tab.Beach_Name}
                                </td>
                                <td>
                                    {tab.Water_Temperature}
                                </td>
                                <td>
                                    {tab.Measurement_ID}
                                </td>
                                <td>
                                    {tab.Measurement_Timestamp_Label}
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
            )
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
                <table className="table table striped">
                    <thead>
                        <tr>
                            <th>
                                Beach_Name
                            </th>
                            <th>
                                Water_Temperature
                            </th>
                            <th>
                                Measurement_ID
                            </th>
                            <th>
                                Measurement_Timestamp_Label
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tables.map(tab=>
                            <tr >
                                <td>
                                    {tab.Beach_Name}
                                </td>
                                <td>
                                    {tab.Water_Temperature}
                                </td>
                                <td>
                                    {tab.Measurement_ID}
                                </td>
                                <td>
                                    {tab.Measurement_Timestamp_Label}
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}
}