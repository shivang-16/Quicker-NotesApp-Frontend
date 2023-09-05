import React, { useState, useEffect, useContext } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';
import reminder from '../img/notification.png';
import notesimg from '../img/notes.png';
import recycle from '../img/delete.png';
import pen from '../img/pen.png';
import { server } from '../main';
import { Context } from '../main';

const Mainbody = () => {
  
  const [sidebarWidth, setSidebarWidth] = useState('70px');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [notes, setNotes] = useState([]);
  const {isAuthenticated, setIsAuthenticated} = useContext(Context)
  const handleSubmit= async(e)=>{
      e.preventDefault();
      try {
        const {data} = await axios.post(`${server}/notes/create`,{
          title, desc
        },{
           headers:{
            "Content-Type": 'application/json'
           },
           withCredentials: true,
        })
         toast.success(data.message)
         setIsAuthenticated(true);
      } catch (error) {
        toast.error(error.response.data.message)
        setIsAuthenticated(false);
      }
  }

  const getNotes = async()=>{
    
   try {
    const {data} = await axios.get(`${server}/notes/my`, {
      withCredentials: true,
    })
    console.log(data.notes);
    setNotes(data.notes);
    
   } catch (error) {
    console.log(error)
   }
  }

  useEffect(() => {
    getNotes();
    
  }, []);
  

  return (
    <>
    <Navbar sidebarWidth={sidebarWidth} setSidebarWidth={setSidebarWidth}/>
    <main id='main-body'>
      <div className="sidebar" style={{width: sidebarWidth}}>
        <div className='box1'>
          <div className='icon side-active'>
           <img src={notesimg} alt="logo" />
          </div>
          <div className='notes box-active'>
            <p>Notes</p>
          </div>
        </div>
        <div className='box1'>
          <div className='icon'>
            <img src={reminder} alt="Logo" />
          </div>
          <div className='notes'>
            <p>Reminder</p>
          </div>
        </div>
        <div className='box1'>
          <div className='icon'>
            <img src={pen} alt="Logo" />
          </div>
          <div className='notes'>
            <p>Edit Notes</p>
          </div>
        </div>
        <div className='box1'>
          <div className='icon'>
            <img src={recycle} alt="Logo" />
          </div>
          <div className='notes'>
            <p>Recycle Bin</p>
          </div>
        </div>
      </div>
      <div className='notesArea'>
        <div className='addNoteBox'>
          <form onSubmit={handleSubmit}>
          <div className="addNote">
            <input type="text" className='textarea' placeholder='Title' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
          </div>
          <div className="addNote">
         <textarea name="" id="" cols="78" rows="5" className='textarea' placeholder='Take a note' value={desc} onChange={(e)=>{setDesc(e.target.value)}}></textarea>
          </div>
          <div>
            <button type='submit'>+ Add note</button>
            <button>Clear</button>
          </div>
          </form>
        </div>
        <div className="notes-card-area">
          {
            isAuthenticated === true ? notes.map(( element)=>{
              const {title, desc , tag, _id} = element
              return <div className="note-card" key={_id}>
                     <h2>{title}</h2>
                     <p>{desc}</p>
                     <p>{tag}</p>
              </div>
            }):(
              <p>notes not found</p>
            )
          }
         
        </div>
      </div>
    </main>

    </>
  );
 
};

export default Mainbody;

