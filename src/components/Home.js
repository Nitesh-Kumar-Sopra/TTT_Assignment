import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './Home.css';
import { NavLink } from 'react-router-dom';


const Home = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    const ctx = document.getElementById('histogram').getContext('2d');
    const wordCount = data.reduce((count, text) => {
      text.split(' ').forEach(word => {
        count[word] = (count[word] || 0) + 1;
      });
      return count;
    }, {});
    const sortedWords = Object.keys(wordCount).sort((a, b) => wordCount[b] - wordCount[a]);
    const topWords = sortedWords.slice(0, 20);
    const chartData = topWords.map(word => [word, wordCount[word]]);
    const newChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartData.map(data => data[0]),
        datasets: [{
          label: 'Word Frequency',
          data: chartData.map(data => data[1]),
          // backgroundColor: ''
        }],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Top 20 words VS Frequency of Occurrence',
            font: {
              size: 18,
              weight: 'bold'
            }
          },
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              fontColor: '#333',
              fontSize: 3,
              boxWidth: 12,
          // usePointStyle: true
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Top 20 Words',
              color: '#333',
              font: {
                size: 14,
                weight: 'bold'
              }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Frequency of Occurrence',
              color: '#333',
              screenLeft: '50px',
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            ticks: {
              beginAtZero: true
            }
          }
        }
      },
      plugins: [{
        afterDatasetsDraw: (chart) => {
          const ctx = chart.ctx;
          chart.data.datasets.forEach((dataset, index) => {
            const meta = chart.getDatasetMeta(index);
            if (!meta.hidden) {
              meta.data.forEach((element, index) => {
                const value = dataset.data[index].toFixed(0);
                const x = element.x + element.width/50;
                const y = element.y - 7;
                ctx.fillText(value, x, y);
              });
            }
          });
        }
      }]
    });
    setChartData(chartData);
    chartRef.current = newChartInstance;
  }, [data]);

  const fetchData = async () => {
    const response = await fetch('https://www.terriblytinytales.com/test.txt');
    const text = await response.text();
    setData(text.split('\n').filter(line => line !== ''));
  };

  const downloadCSV = () => {
    console.log('Download button clicked');
    const columnNames = ['Word', 'Frequency'];
    const csvData = [columnNames].concat(chartData).map(row => row.join(',')).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'histogram.csv');
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="div">
      <p className='para'>Terribly Tiny Tale Assignment</p>
    <div className="histogram">
      <canvas id="histogram" className="histogram-canvas" />
    </div>
    <div className="downloadbtn">
      <button className="downbtn" onClick={downloadCSV}>
      Download the Data
      </button>
      <NavLink to="/">
      <button className="downbtn2" >
      Go back to Home
      </button>
      </NavLink>
      
     
    </div>
   
  </div>
  );
};

export default Home;