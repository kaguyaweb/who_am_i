import React, { useEffect, useState } from 'react'
import db from "../firebase"
import { doc, updateDoc } from "firebase/firestore"; 
import Button from '@mui/material/Button';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2'
import "./Vote.css"

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

const Vote = ({ id, posts, labels, data }) => {
    const [dt, setData] = useState(data);
    const [name, setName] = useState('')

    useEffect(() => {
        const docRef = doc(db, "posts", id);
        updateDoc(docRef, {username_list: labels, count_list: dt});
    },[labels])
    // async
    const count_up = (username) => {
        const index = labels.indexOf(username)
        setName(username+"さん")
        setData((prevState) =>
            prevState.map((dat, indx) => (indx === index ? dat + 1 : dat))
        )
    }

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

    return (
        <div>
            <p>あなたが予想したのは...{name}</p>
            <select className='name_pulldown' id={`name_select-${id}`}>
                {option}
            </select>
            <Button variant='outlined' onClick={() => count_up(document.getElementById(`name_select-${id}`).value)}>予想する</Button>
            <Bar options={chart_options} data={Chartdata} />
        </div>
    )
}

export default Vote
