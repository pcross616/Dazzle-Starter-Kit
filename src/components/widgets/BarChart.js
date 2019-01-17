import React from 'react';
import { Bar } from 'react-chartjs-2';
import { getRandomInt } from './util';

class BarChart extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Bar Chart First dataset',
            backgroundColor: '#E8575A',
            borderColor: '#E8575A',
            hoverBackgroundColor: 'rgba(220,220,220,0.75)',
            hoverBorderColor: 'rgba(220,220,220,1)',
            data: [65, 59, 80, 81, 56, 55, 40],
          },
          {
            label: 'My Second dataset',
            backgroundColor: '#0094D6',
            borderColor: '#0094D6',
            hoverBackgroundColor: 'rgba(151,187,205,0.75)',
            hoverBorderColor: 'rgba(151,187,205,1)',
            data: [28, 48, 40, 19, 86, 27, 90],
          },
        ],
      },
    };
  }

  componentDidMount() {
    const refreshIntervalId  = setInterval(() => {
      this.state.data.datasets[0].data.shift();
      this.state.data.datasets[0].data.push(getRandomInt(0, 90));

      this.state.data.datasets[1].data.shift();
      this.state.data.datasets[1].data.push(getRandomInt(0, 90));
      this.setState({
        data: this.state.data,
        refreshIntervalId,
      });
      console.log('tick');
    }, 2000);
  }

  componentDidUpdate() {
    this.refs.chart.chartInstance.update();
    console.log('update');
  }

  componentWillUnmount() {
    clearInterval(this.state.refreshIntervalId);
  }

  render() {
    console.log('render');
    return (
      <div>
         <Bar ref="chart" data={this.state.data} options={{tooltips: {enabled: true}, responsive: true, animation: {duration: 300 }}} height={210} width={800}/>
       </div>
    );
  }
}

export default BarChart;
