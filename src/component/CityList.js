import React, { Component } from 'react';
import Chart from 'react-google-charts';

function generateHTMLOutput(response) {
   /*
   *This function converts data of cities into a list
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

function remove_year_and_seconds(str)
{
   return str.substr(5,11)
}

class City extends React.Component {
   /*
   *This component display the charts for a single city.
   */

   render() {
      var temperatureData = [
         [
            'Day',
            'Temperature'
         ]
      ]
      var pressureData = [
         [
            'Day',
            'Pressure'
         ]
      ]
      var humidityData = [
         [
            'Day',
            'Humidity',
         ]
      ]
      var date, temperature, pressure, humidity
      var total_intervals=this.props.data.list.length
      for (let interval = 0; interval < total_intervals; interval++) {
         date = this.props.data.list[interval]['dt_txt']
         //compiling data for graphs
         temperature = this.props.data.list[interval]['main']['temp']
         pressure = this.props.data.list[interval]['main']['pressure']
         humidity = this.props.data.list[interval]['main']['humidity']



         var temperature_in_centigrade=convert_kelvin_to_centigrade(temperature)
         date=remove_year_and_seconds(date)
         temperatureData.push([date, temperature_in_centigrade])
         pressureData.push([date, pressure])
         humidityData.push([date, humidity])
      }
      return (<div>
         <h1>{JSON.stringify(this.props.data.city.name)}</h1>
         <div>
            <Chart
               width={1800}
               height={600}
               chartType="Line"
               loader={<div>Loading Chart</div>}
               data={temperatureData}
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
               data={pressureData}
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
               data={humidityData}
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
   /*
   *This component displays a list of cities
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