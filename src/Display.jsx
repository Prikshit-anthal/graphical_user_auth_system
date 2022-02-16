import React, { useState } from "react";
import Nav from "./components/Nav";
import SetPictorialData from "./components/SetPictorialData";
import ShowPictorialData from "./components/ShowPictorialData";

function Display()
{
     const [images, setImages] = useState([])
     const [tagNames, setTagNames] = useState([])
     const obj={images:images,setImages:setImages,tagNames:tagNames,setTagNames:setTagNames}
    const [navOption,setNavOption]=useState('user');

    return (
      <>
        <Nav navOption={navOption} setNavOption={setNavOption} />
        <div className='ml-64 m-4 '>
          <div className='ml-4'>
            <SetPictorialData ></SetPictorialData>
            <ShowPictorialData poop={obj}></ShowPictorialData>
          </div>
        </div>
      </>
    )
}

export default Display