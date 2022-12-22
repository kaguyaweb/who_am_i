// rafce タブ
import React,{ forwardRef, useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import "./Submits.css"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import db from '../firebase';
import Vote from "./Vote"

const Submits = forwardRef(
    ({ id, username, answer1, answer2, answer3, posts, labels, data, answer, setAnswer }, ref) => {
        const [open, setOpen] = useState('close')
        
        const Open_or_Close = () => {
            if(open === 'close') {
                setOpen('open')
            } else if (open === 'open') {
                setOpen('close')
            }
        }

        const Delete = async(id) => {
            await deleteDoc(doc(db, "posts", id));
        }

        const Reset_result = (id) => {
            const docRef = doc(db, "posts", id);
            updateDoc(docRef, {count_list: data.fill(0)});
        }

        return (
            <div className='submit' ref={ref}>
                <div className='submit_body'>
                    <div className='submit_header'>
                        <div className='submit_headerText'>
                            <h3 className={open}>
                                名前:{username}
                            </h3>
                        </div>
                        <div className='submit_headerDescription'>
                            <p>よく行くお店は？:{answer1}</p>
                            <p>最近あった嬉しかったことは？:{answer2}</p>
                            <p>好きな◯◯:{answer3}</p>
                        </div>
                    </div>
                    <Vote id={id} posts={posts} labels={labels} data={data} answer={answer} setAnswer={setAnswer}/>
                    <div align="right">
                        <button className='answer_button' onClick={Open_or_Close} title="answer_open">
                            <LockOpenIcon fontSize='small' />
                        </button>
                        <button className='reset_button' onClick={() => Reset_result(id)} title="reset_vote_result">
                            <HighlightOffIcon fontSize='small' />
                        </button>
                        <button className='delete_button' onClick={() => Delete(id)} title="delete_data">
                            <DeleteOutlineIcon fontSize='small' />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
)

export default Submits
