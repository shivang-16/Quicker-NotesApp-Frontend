import React, { useState, useEffect, useContext } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import axios from 'axios';
import toast from 'react-hot-toast';
import recycle from '../img/delete.png';
import pen from '../img/pen.png';
import { server } from '../main';
import { Context } from '../main';
import Spinner from './Spinner';


const Mainbody = () => {
  
 
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tag, setTag] = useState('')
  const [notes, setNotes] = useState([]);
  const [loader, setLoader] = useState(false);
  const [editNote, setEditNote] = useState({ _id: '', title: '', desc: '', tag: '' });

  const {isAuthenticated, setIsAuthenticated, isLoading, setIsLoading, refresh, setRefresh,sidebarWidth, setSidebarWidth} = useContext(Context)


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
         setTitle('')
         setDesc('')
         setTag('')

         setIsAuthenticated(true);
         setRefresh(prev=>!prev)
         setIsLoading(false)
      } catch (error) {
        toast.error(error.response.data.message)
        setIsAuthenticated(false);
        setIsLoading(false)
      }
  }

  const getNotes = async()=>{
    setLoader(true)
   try {
    const {data} = await axios.get(`${server}/notes/my`, {
      withCredentials: true,
    })
    setLoader(false);
    setNotes(data.notes);
    
   } catch (error) {
    setLoader(false)
   }
  }


  const handleDelete = async(_id)=>{
    confirm("Are you sure want to delete this note")
    try {
      await axios.delete(`${server}/notes/${_id}`,{
        withCredentials: true,
       })
       setRefresh(prev=>!prev)
    } catch (error) {
       toast.error(error.response.data.message)
    }
  }

  const handleUpdate = (_id) => {
    const noteToEdit = notes.find((note) => note._id === _id);
    if (noteToEdit) {
      setEditNote({
        _id: noteToEdit._id,
        title: noteToEdit.title,
        desc: noteToEdit.desc,
        tag: noteToEdit.tag,
      });
    }
  };


  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${server}/notes/${editNote._id}`, editNote, {
        withCredentials: true,
      });
   
      toast.success('Note updated successfully');
   
      setEditNote({ _id: '', title: '', desc: '', tag: '' });

      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
     
    }
  };
  
  const handleCancelEdit = () => {
    setEditNote({ _id: '', title: '', desc: '', tag: '' });
  };
  

  const handleClear = () => {
    setTitle('');
    setDesc('');
    setTag('');
  };
  
  useEffect(() => {
    getNotes();
  }, [refresh]);
  

  return (
    <>
    <Navbar sidebarWidth={sidebarWidth} setSidebarWidth={setSidebarWidth}/>
    <main id='main-body'>
       <Sidebar sidebarWidth={sidebarWidth}/>
 
      <div className='notesArea'>
        <div className='addNoteBox'>
          <form onSubmit={handleSubmit}>
          <div className="addNote addNote_title">
            <input type="text" className='textarea' placeholder='Title' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            <input type="text" className='input-tag textarea' placeholder='Add tag' value={tag}  onChange={(e)=>{setTag(e.target.value)}}
            />
          </div>
          <div className="addNote">
         <textarea name="" id="" rows="5" className='textarea' placeholder='Take a note' value={desc} onChange={(e)=>{setDesc(e.target.value)}}></textarea>
        
          </div>
          <div style={{display:'flex', alignItems:"center"}}>
            <button type='submit' disabled={isLoading || !isAuthenticated} className='login-btn'>+ Add note</button>
            <div style={{display: "inline-block", padding:"8px 10px", backgroundColor:'brown'}} className='login-btn' onClick={handleClear}>Clear</div>
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
                <button className='icon card-btn delete-btn' onClick={() => handleDelete(_id)}>
                  <img src={recycle} alt="Logo" />
                </button>
                <button className='icon card-btn edit-btn' onClick={() => handleUpdate(_id)}>
                  <img src={pen} alt="Logo" />
                </button>
                    
              </div>
            }):(
              <h4>Login to your account to see your notes</h4>
            )
          }
         
        </div>
        )}

        {editNote._id && (
            <div className="modal-container">
            <div className="modal-content">
              <span className="modal-close" onClick={handleCancelEdit}>
                &times;
              </span>
              <h2>Edit Note</h2>
              <div className='addNoteBox'>
             <form onSubmit={handleEditSubmit}>
             <div className="addNote addNote_title">
               <input
                 type="text" className='textarea'
                 value={editNote.title}
                 onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
                 placeholder="Edit Title"
               />
               <input
                 type="text" className='textarea input-tag'
                 value={editNote.tag}
                 onChange={(e) => setEditNote({ ...editNote, tag: e.target.value })}
                 placeholder="Edit Tag"
               />
               </div>
               <textarea className='textarea'
                 value={editNote.desc}
                 onChange={(e) => setEditNote({ ...editNote, desc: e.target.value })}
                 placeholder="Edit Description"
               />
               <div>
               <button type="submit" disabled={isLoading} className='login-btn'>Update</button>
               <button className='login-btn' onClick={handleCancelEdit}>Cancel</button>
               </div>
             </form>
             </div>
           </div>
           </div>
         )
        }
  

      </div>
    </main>

    </>
  );
 
};

export default Mainbody;

