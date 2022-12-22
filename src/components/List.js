import React, { useState, useEffect } from 'react'
import Submits from './Submits'
import db from "../firebase"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"; 
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import Avatar from '@mui/material/Avatar';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Typography from '@mui/material/Typography';
import './List.css'

const List = () => {
    const [posts, setPosts] = useState([]);
    const [labels, setLabels] = useState([]);
    const [answer, setAnswer] = useState([])

    useEffect(() => {
        const postData = collection(db, "posts");
        const q = query(postData, orderBy("timestamp", "asc"))

        // リアルタイムでデータ取得→onSnapshot
        onSnapshot(q, (querySnapshot) => {
            setPosts(querySnapshot.docs.map((doc) => [doc.id, doc.data()]))
            setLabels(querySnapshot.docs.map((doc) => doc.data().username))
        })
    }, []);
    const generateRandomString = (num) => {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < num; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
      
        return result;
    }

    return (
        // {`all_answer-${reveal}`}
        <div className="all-answer">
            <div className='answer-show'>
                <Avatar sx={{ m: 1, mt: 3, bgcolor: 'info.main' }}>
                    <NoteAltIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    あなたの予想
                </Typography>
                {answer.map((ans, index) => (
                    <p key={index}>{index+1}人目の予想は...{ans}さん</p>
                ))}
            </div>
            <div className='list-avatar'>
                <Avatar sx={{ m: 1, mt: 3, bgcolor: 'success.main' }}>
                    <FormatListNumberedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    みんなの回答
                </Typography>
            </div>
            {posts.map((post) => (
                <Submits
                    key={generateRandomString(20)}
                    id={post[0]}
                    username={post[1].username}
                    answer1={post[1].answer1}
                    answer2={post[1].answer2}
                    answer3={post[1].answer3}
                    posts={posts}
                    labels={labels}
                    data={post[1].count_list}
                    answer={answer}
                    setAnswer={setAnswer}
                />
            ))}
        </div>
    )
}

export default List
