import React, { useState } from 'react'
import db from "../firebase"
import { doc, updateDoc } from "firebase/firestore"; 
import Button from '@mui/material/Button';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2'
import "./Vote.css"

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

const Vote = ({ id, posts, labels, data }) => {
    const [dt, setData] = useState(data);

    const count_up = (async(username, id) => {
        const index = labels.indexOf(username)
        const docRef = doc(db, "posts", id);
        setData((prevState) =>
            prevState.map((dt, indx) => (indx === index ? dt + 1 : dt))
        )
        await updateDoc(docRef, {username_list: labels, count_list: data});
    })

    const option = posts.map((post)=><option className='name' value={post[1].username}>{post[1].username}</option>)

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
                data: dt,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    }

    // 要変更
    const [opens, setOpens] = useState('close')
        
    const Open = () => {
        if(opens === 'close') {
            setOpens('open')
        }
    }

    return (
        <div>
            <select className='name_pulldown' id='name_select'>
                {option}
            </select>
            <Button variant='outlined' onClick={() => count_up(document.getElementById("name_select").value, id)}>予想する</Button>
            <div className="result_chart">
                <Bar options={chart_options} data={Chartdata} />
            </div>
            
        </div>
    )
}

export default Vote
