import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export function UserPage () {

    return(
        <>
        <div style={{border:'1px solid black',width:'40%',padding:'30px',marginLeft:'30%',marginTop:'10%',borderRadius:'10px'}}>
            
           <button type="button" style={{padding:'10px',marginRight:'10px'}}><Link to='/signup'>SignUp</Link></button>
           <button type="button" style={{padding:'10px',marginLeft:'10px'}}><Link to='/login'>Login</Link></button>
        </div>
        </>
    )
}