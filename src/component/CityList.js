import React, { Component } from 'react';
import Chart from 'react-google-charts';

function generateHTMLOutput(response) {
   /**
    * This function converts data of cities into a list 
    */
   var table = []

   for (let interval = response.length - 1; interval > -1; interval--) {
      let children = []
      children.push(<City data={(JSON.parse(response[interval]).data)} />)
      table.push(<div>{children}</div>);
   }
   return table;
}

function convert_kelvin_to_centigrade(temp) {
   return temp - 273
}

function remove_year_and_seconds(str) {
   return str.substr(5, 11)
}

class City extends React.Component {
   /**
    * This component display the charts for a single city.
    * 
    */
   render() {
      var temperature_data = this.props.data.list.map(x => [remove_year_and_seconds(x['dt_txt']),
      convert_kelvin_to_centigrade(x['main']['temp'])])
      temperature_data = [
         [
            'Day',
            'Temperature'
         ]
      ].concat(temperature_data)
      var pressure_data = this.props.data.list.map(x => [remove_year_and_seconds(x['dt_txt']),
      x['main']['pressure']])
      pressure_data = [
         [
            'Day',
            'Pressure'
         ]
      ].concat(pressure_data)
      var humidity_data = this.props.data.list.map(x => [remove_year_and_seconds(x['dt_txt']),
      x['main']['humidity']])
      humidity_data = [
         [
            'Day',
            'Temperature'
         ]
      ].concat(humidity_data)
      return (<div>
         <h1>{JSON.stringify(this.props.data.city.name)}</h1>
         <div>
            <Chart
               width={1800}
               height={600}
               chartType="Line"
               loader={<div>Loading Chart</div>}
               data={temperature_data}
               options={{
                  chart: {
                     title: 'Temperature',
                     subtitle: '',
                  },
               }}
            />
            <Chart
               width={1800}
               height={600}
               chartType="Line"
               loader={<div>Loading Chart</div>}
               data={pressure_data}
               options={{
                  chart: {
                     title: 'Pressure',
                     subtitle: '',
                  },
               }}
            />
            <Chart
               width={1800}
               height={600}
               chartType="Line"
               loader={<div>Loading Chart</div>}
               data={humidity_data}
               options={{
                  chart: {
                     title: 'Humidity',
                     subtitle: '',
                  },
               }}
            />
         </div>
      </div>)
   }
}


class ListOfCities extends Component {
   /**
    * This component displays a list of cities 
    */
   render() {
      const { list, getRequest } = this.props;
      return (
         <div className="App">
            <div>
               <input type="text" id="searchId" /><br />
               <button id='searchId' onClick={getRequest}>Get Results</button>
               {generateHTMLOutput(list)}
            </div>
         </div>
      );
   }
}
export default ListOfCities;