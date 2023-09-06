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
import profileImg from '../img/profile.png'
const Mainbody = () => {
  
  const [sidebarWidth, setSidebarWidth] = useState('70px');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tag, setTag] = useState('')
  const [notes, setNotes] = useState([]);
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [editNote, setEditNote] = useState({ _id: '', title: '', desc: '', tag: '' });

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
    console.log(data.notes);
    setNotes(data.notes);
    
   } catch (error) {
    console.log(error)
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
    // Make an axios request to update the note on the server
    try {
      await axios.put(`${server}/notes/${editNote._id}`, editNote, {
        withCredentials: true,
      });
      // Optionally, display a success message.
      toast.success('Note updated successfully');
      // Clear the editNote state
      setEditNote({ _id: '', title: '', desc: '', tag: '' });
      // Refresh the notes
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  
  const handleCancelEdit = () => {
    // Clear the editNote state
    setEditNote({ _id: '', title: '', desc: '', tag: '' });
  };
  
  useEffect(() => {
    getNotes();
  }, [refresh]);
  

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
            <img src={profileImg} alt="Logo" />
          </div>
          <div className='notes'>
            <p>My Profile</p>
          </div>
        </div>
     
      </div>
      <div className='notesArea'>
        <div className='addNoteBox'>
          <form onSubmit={handleSubmit}>
          <div className="addNote addNote_title">
            <input type="text" className='textarea' placeholder='Title' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            <input type="text" className='input-tag textarea' placeholder='Add tag' value={tag}  onChange={(e)=>{setTag(e.target.value)}}
            />
          </div>
          <div className="addNote">
         <textarea name="" id="" cols="68" rows="5" className='textarea ' placeholder='Take a note' value={desc} onChange={(e)=>{setDesc(e.target.value)}}></textarea>
        
          </div>
          <div>
            <button type='submit' disabled={isLoading} className='login-btn'>+ Add note</button>
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
                <button className='icon card-btn delete-btn' onClick={() => handleDelete(_id)}>
                  <img src={recycle} alt="Logo" />
                </button>
                <button className='icon card-btn edit-btn' onClick={() => handleUpdate(_id)}>
                  <img src={pen} alt="Logo" />
                </button>
                    
              </div>
            }):(
              <p>notes not found</p>
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
   
    <form onSubmit={handleEditSubmit}>
      <input
        type="text"
        value={editNote.title}
        onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
        placeholder="Edit Title"
      />
      <textarea
        value={editNote.desc}
        onChange={(e) => setEditNote({ ...editNote, desc: e.target.value })}
        placeholder="Edit Description"
      />
      <input
        type="text"
        value={editNote.tag}
        onChange={(e) => setEditNote({ ...editNote, tag: e.target.value })}
        placeholder="Edit Tag"
      />
      <button type="submit">Save</button>
      <button onClick={handleCancelEdit}>Cancel</button>
    </form>
  </div>
  </div>
)}

      </div>
    </main>

    </>
  );
 
};

export default Mainbody;

