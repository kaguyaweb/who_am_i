import React, { useState, useEffect } from 'react'
import db from "../firebase"
import { collection, onSnapshot, orderBy, query, doc, updateDoc, increment } from "firebase/firestore"; 
import Button from '@mui/material/Button';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2'
import "./Vote.css"

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

const Vote = ({id}) => {
    const [posts, setPosts] = useState([]);
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([0]*labels.length);
    // const [count, setCount] = useState(0);

    useEffect(() => {
        const postData = collection(db, "posts");
        const q = query(postData, orderBy("timestamp", "desc"))

        // リアルタイムでデータ取得→onSnapshot
        onSnapshot(q, (querySnapshot) => {
            setPosts(querySnapshot.docs.map((doc) => [doc.id, doc.data()]))
            setLabels(querySnapshot.docs.map((doc) => [doc.data().username]))
            setData(querySnapshot.docs.map((doc) => [doc.data().predict_count]))
        })
    }, []);

    // 要変更
    const count_up = (async(id) => {
        const now_data = doc(db, "posts", id);
        await updateDoc(now_data, {
            predict_count: increment(1)
          });
        Open()
        // console.log(now_data)
    })

    const Get_name = () => {
        const name = document.name;
        const num = name.selectedIndex;
        const str = name.options[num].value;
        return str
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
                data: data,
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
            <select className='name_pulldown' name='name'>
                {option}
            </select>
            <Button variant='outlined' onClick={() => count_up(Get_name())}>予想する</Button>
            <div className="result_chart">
                <Bar options={chart_options} data={Chartdata} />
            </div>
            
        </div>
    )
}

export default Vote
