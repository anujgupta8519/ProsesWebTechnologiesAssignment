import React from 'react'

function Logo({width = '',className=""}) {
  return (
    <div className={ `${className} `} style={{width:`${width}`}}>Anuj Gupta</div>
  )
}

export default Logo