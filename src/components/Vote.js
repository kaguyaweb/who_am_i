import React from 'react'
import db from "../firebase"
import { doc, updateDoc } from "firebase/firestore"; 
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import BarChart from './BarChart';

const Vote = ({ id, posts, labels, data, answer, setAnswer }) => {
    const docRef = doc(db, "posts", id);

    // async
    const count_up = (username) => {
        setAnswer([...answer, username])
        const index = labels.indexOf(username)
        updateDoc(docRef, { username_list: labels, count_list: data.map((dat, indx) => (indx === index ? dat + 1 : dat)) })
    }

    const option = posts.map((post)=><option key={post[0]} className='name' value={post[1].username}>{post[1].username}</option>)

    return (
        <Box>
            <div>
                {/* <p>あなたが予想したのは...{name}</p> */}
                <select className='name_pulldown' id={`name_select-${id}`}>
                    {option}
                </select>
                <Button variant='outlined' onClick={() => count_up(document.getElementById(`name_select-${id}`).value)}>予想する</Button>
                <BarChart labels={labels} data={data} />
            </div>
        </Box> 
    )
}

export default Vote
