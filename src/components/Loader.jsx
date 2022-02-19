import React from "react";
import "./Loader.scss"

function Loader(prop)
{
  const displayLoader=prop.display
 let displayStyle= displayLoader===true?'block':'none';

    return (
      <div className='loader-container' style={{ display: displayStyle }}>
        {' '}
        <div class='loading'></div>
      </div>
    )
}

export default Loader;