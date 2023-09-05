import React from 'react'
import loader from '../img/loader.gif'
const Spinner = () => {
  return (
    <div>
        <img src={loader} alt="" style={{height: "60px"}}/>
    </div>
  )
}

export default Spinner