// rafce タブ
import React,{ forwardRef, useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import "./Submits.css"
import { deleteDoc, doc } from "firebase/firestore"
import db from '../firebase';

const Submits = forwardRef(
    ({ id, username, answer1, answer2, answer3 }, ref) => {
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
                            <p>回答1:{answer1}</p>
                            <p>回答2:{answer2}</p>
                            <p>回答3:{answer3}</p>
                        </div>
                    </div>
                    <div align="right">
                        <button className='answer_button' onClick={Open_or_Close}>
                            <LockOpenIcon fontSize='small' />
                        </button>
                        <button className='delete_button' onClick={() => Delete(id)}>
                            <DeleteOutlineIcon fontSize='small' />
                        </button>
                    </div>
                    
                </div>
            </div>
        )
    }
)

export default Submits