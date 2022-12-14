import React, { useState, useEffect } from 'react'
import db from "../firebase"
import { collection, onSnapshot, orderBy, query, doc, updateDoc, increment } from "firebase/firestore"; 
import Button from '@mui/material/Button';

const Vote = ({id}) => {
    const [posts, setPosts] = useState([]);
    // const [count, setCount] = useState(0);

    useEffect(() => {
        const postData = collection(db, "posts");
        const q = query(postData, orderBy("timestamp", "desc"))

        // リアルタイムでデータ取得→onSnapshot
        onSnapshot(q, (querySnapshot) => {
            setPosts(querySnapshot.docs.map((doc) => [doc.id, doc.data()]))
        })
    }, []);

    const count_up = (async(id) => {
        const now_data = doc(db, "posts", id);
        await updateDoc(now_data, {
            predict_count: increment(1)
          });
        console.log(now_data)
    })

    const option = posts.map((post)=><option value={post[1].username}>{post[1].username}</option>)

    return (
        <div>
            <select className='name_pulldown' name='name'>
                {option}
            </select>
            <Button variant='outlined' onClick={() => count_up(id)}>予想する</Button>
        </div>
    )
}

export default Vote
