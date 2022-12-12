import React, { useState, useEffect } from 'react'
import db from "../firebase"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"; 
import Button from '@mui/material/Button';

const Vote = () => {
    const [posts, setPosts] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const postData = collection(db, "posts");
        const q = query(postData, orderBy("timestamp", "desc"))

        // リアルタイムでデータ取得→onSnapshot
        onSnapshot(q, (querySnapshot) => {
            setPosts(querySnapshot.docs.map((doc) => [doc.id, doc.data()]))
        })
    }, []);

    const drawChart = () => {
        var ctx = document.getElementById('canvas').getContext('2d');
        window.myChart = new Chart(ctx, { // インスタンスをグローバル変数で生成
            type: 'bar',
            data: { // ラベルとデータセット
            labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],
            datasets: [{
                data: chartVal, // グラフデータ
                backgroundColor: 'rgb(0, 134, 197, 0.7)', // 棒の塗りつぶし色
                borderColor: 'rgba(0, 134, 197, 1)', // 棒の枠線の色
                borderWidth: 1, // 枠線の太さ
            }],
            },
            options: {
            legend: {
                display: false, // 凡例を非表示
            }
            }
        });
    }

    const option = posts.map((post)=><option value={post[1].username}>{post[1].username}</option>)

    return (
        <div>
            <select className='name_pulldown' name='name'>
                {option}
            </select>
            <Button variant='outlined'>予想する</Button>
        </div>
    )
}

export default Vote
