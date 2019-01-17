import React from 'react';
import Doughnut from 'react-chartjs-2';
import {getRandomInt} from './util';

class DoughnutChart extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {
        labels: [
          'Red',
          'Green',
        ],
        datasets: [{
          data: [getRandomInt(0, 40), 50],
          backgroundColor: [
            '#00A840',
            '#F7464A',
          ],
        }],
      },
    };
  }

  componentDidMount() {
    const refreshIntervalId  = setInterval(() => {
      this.state.data.datasets[0].data.shift();
      this.state.data.datasets[0].data.push(getRandomInt(0, 40));

      this.setState({
        data: this.state.data,
        refreshIntervalId,
      });
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.state.refreshIntervalId);
  }
  render() {
    return (
      <div>
         <Doughnut data={this.state.data} options={{tooltips: true, animation: { easing: 'easeInSine'}}} height={200} width={350}/>
       </div>
    );
  }
}

export default DoughnutChart;
