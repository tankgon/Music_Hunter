import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    Tooltip,
    PointElement,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import classNames from 'classnames/bind';
import styles from './Zingchart.module.scss';
const cx = classNames.bind(styles);

export function Chart({ chart }) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        LineElement,
        PointElement,
        Tooltip,
        Filler
    );

    const chartItems = Object.values(chart.items)

    const [chartData, setChartData] = useState({ datasets: [] });
    const [chartOptions, setChartOptions] = useState({});

    const data1= []
    const data2= []
    const data3= []

    chartItems[0].map((item, index) => {
        if(index % 2 === 0 ) {
            data1.push(item.counter)
        }
    })
    chartItems[1].map((item, index) => {
        if(index % 2 === 0 ) {
            data2.push(item.counter)
        }
    })
    chartItems[2].map((item, index) => {
        if(index % 2 === 0 ) {
            data3.push(item.counter)
        }
    })

    const newLabels = []
    chart.times.map((time, index) => {
        if(index%2===0) {
            newLabels.push(`${time.hour} : 00`)
        }
    })

    useEffect(() => {
        setChartData({
            labels: newLabels,
            datasets: [
                {
                    tension: 0.3,
                    data: data1,
                    //line
                    borderWidth: 2,
                    borderColor: 'rgb(53, 162, 235)',
                    //point
                    pointRadius:3,
                    pointBackgroundColor: 'rgb(53, 162, 235)',
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: 'rgb(53, 162, 235)',
                    //point border
                    pointBorderWidth: 0,
                    pointHoverBorderWidth: 3,
                    pointHoverBorderColor: 'rgb(255, 255, 255)',
                },
                {
                    tension: 0.3,
                    data: data2,
                    borderWidth: 2,
                    borderColor: 'rgb(39, 186, 156)',
                    //point
                    pointRadius:3,
                    pointBackgroundColor: 'rgb(39, 186, 156)',
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: 'rgb(39, 186, 156)',
                    //point border
                    pointBorderWidth: 0,
                    pointHoverBorderWidth: 3,
                    pointHoverBorderColor: 'rgb(255, 255, 255)',
                },
                {
                    tension: 0.3,
                    data: data3,
                    borderWidth: 2,
                    borderColor: 'rgb(255, 99, 132)',
                    //point
                    pointRadius: 3,
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: 'rgb(255, 99, 132)',
                    //point border
                    pointBorderWidth: 0,
                    pointHoverBorderWidth: 3,
                    pointHoverBorderColor: 'rgb(255, 255, 255)',
                },
            ],
        });
        setChartOptions({
            layout: {
                padding: 20
            },
            responsive: true,
            hover: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            scales: {
                y: {
                    beginAtZero: true,
                    min: 0,
                    max: chart.maxScore,
                    stepSize: 1000,
                    grid: {
                        display: true,
                    },
                    ticks: {
                        maxTicksLimit: 5,
                        display: false,
                    },
                },
                x: {
                    grid: {
                        display: false,
                    },
                },
            },
        });
    }, []);
    

    return (
        <Line height="100" options={chartOptions} data={chartData}/>
    );
}
