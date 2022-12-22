import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

function Bar_chart({labels, data}) {

    const chart_options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'みんなの予想は??'
            }
        }
    }

    const Chartdata = {
        labels,
        datasets: [
            {
                label: '予想',
                data: data,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    }
    return (
        <div>
            <Bar options={chart_options} data={Chartdata} />
        </div>
    )
}

export default Bar_chart
