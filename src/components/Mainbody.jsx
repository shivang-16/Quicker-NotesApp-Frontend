import React, { useState } from 'react';
import notes from '../img/notes.png';
import reminder from '../img/notification.png';
import recycle from '../img/delete.png';
import pen from '../img/pen.png';

const Mainbody = ({sidebarWidth}) => {
  
  return (
    <main id='main-body'>
      <div className="sidebar" style={{width: sidebarWidth}}>
        <div className='box1'>
          <div className='icon side-active'>
            <img src={notes} alt="Logo" />
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
          <div className="addNote">
            <input type="text" className='textarea' placeholder='Take a note'/>
             {/* <textarea name="" id="" cols="30" rows="10"></textarea> */}
          </div>
        </div>
      </div>
    </main>

   
  );
 
};

export default Mainbody;

