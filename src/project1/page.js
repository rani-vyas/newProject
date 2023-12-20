import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export function UserPage () {

    return(
        <>
        <div style={{border:'1px solid black', width:'50%'}}>
           <button type="button" ><Link to='/signup'>SignUp</Link></button>
           <button type="button" ><Link to='/login'>Login</Link></button>
        </div>
        </>
    )
}