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
import Spinner from './Spinner';
const Mainbody = () => {
  
  const [sidebarWidth, setSidebarWidth] = useState('70px');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tag, setTag] = useState('')
  const [notes, setNotes] = useState([]);
  const [loader, setLoader] = useState(false);
  const {isAuthenticated, setIsAuthenticated, isLoading, setIsLoading} = useContext(Context)

  const handleSubmit= async(e)=>{
      e.preventDefault();
      setIsLoading(true);
      getNotes();
      try {
        const {data} = await axios.post(`${server}/notes/create`,{
          title, desc, tag
        },{
           headers:{
            "Content-Type": 'application/json'
           },
           withCredentials: true,
        })
         toast.success(data.message)
         setIsAuthenticated(true);
         setIsLoading(false)
      } catch (error) {
        toast.error(error.response.data.message)
        setIsAuthenticated(false);
      }
  }

  const getNotes = async()=>{
    setLoader(true)
   try {
    const {data} = await axios.get(`${server}/notes/my`, {
      withCredentials: true,
    })
    setLoader(false);
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
          <div className="addNote addNote_title">
            <input type="text" className='textarea' placeholder='Title' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            <input type="text" className='input-tag textarea' placeholder='Add tag' value={tag}  onChange={(e)=>{setTag(e.target.value)}}/>
          </div>
          <div className="addNote">
         <textarea name="" id="" cols="78" rows="5" className='textarea ' placeholder='Take a note' value={desc} onChange={(e)=>{setDesc(e.target.value)}}></textarea>
          </div>
          <div>
            <button type='submit' className='login-btn'>+ Add note</button>
            <button className='login-btn'>Clear</button>
          </div>
          </form>
        </div>
        {loader ? (<Spinner/>
        ):(
          <div className="notes-card-area">
          {
            isAuthenticated === true ? notes.map(( element)=>{
              const {title, desc , tag, _id} = element
              return <div className="note-card" key={_id}>
                     <h3>{title}</h3>
                     <p>{desc}</p>
                     <div className='tag'>
                     <p>{tag}</p>
                     </div>
                    
              </div>
            }):(
              <p>notes not found</p>
            )
          }
         
        </div>
        )}
       
      </div>
    </main>

    </>
  );
 
};

export default Mainbody;

