import React from 'react'
import loader from '../img/loader.gif'
const Spinner = () => {
  return (
    <div className='.modal-container '>
      <div>
        <img src={loader} alt="" style={{height: "60px"}}/>
        </div>
    </div>
  )
}

export default Spinner