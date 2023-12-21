import { isDisabled } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function SignUp () {
  // debugger
const [username,setUsername] = useState('')
const [email,setEmail] = useState('')
const [password1,setPassword1] = useState('')
const [password2,setPassword2] = useState('')
const [error,seterror] = useState('')
const [usernameError,setUsernameError] = useState('')
const [emailError,setemailError] = useState('')
const [password1Error,setPassword1Error] = useState('')
const [password2Error,setPassword2Error] = useState('')
const [message,setsignupmessage]= useState('')
const [isFormDisabled,setFormDisabled] = useState(true);


const data = JSON.stringify({
    'username':username,
    email:email,
    password1:password1,
    password2:password2
})

 /*if(email.matchAll !== '/^[^\s@]+@[^\s@]+\.[^\s@]+$/'){
        setemailError('This Email is not valid')
    }
    
    if(password1 !== password2){
        seterror('password does not match with confirm password')
    }
    if(!password1.length < 8 && password1 !== '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/' ){
        setPassword1Error('password length should be 8.one uppercase,one lowercase,special characters must be included.')
    }
    
    if(!username || !email || !password1 || !password2){
        setUsernameError('This is required.')
        setemailError('This is required.')
        setPassword1Error('This is required.')
        setPassword2Error('This is required.')
    }*/
    
/*if(Object.keys(data).length === 0){
    handleSignup()
}*/

 const handleSignup = async(e) =>{    
    e.preventDefault();
        try{  
            
            const user = await axios({
                'url': 'http://127.0.0.1:8000/register/',
                'method': 'POST',
                'headers': {
                            "Content-Type":'application/json',
                            Accept:'application/json'
                        },
                        data:data
            })
           // return user
           console.log(user)

           if(username && email && password1 && password2){
            setsignupmessage('User Signup Successfully.')
           }
        }catch(error){
            //debugger;
        console.log(error)
        if(error.response && error.response.data && error.response.data.username){
            setUsernameError(error.response.data.username);
        }
        if (error.response && error.response.data && error.response.data.email) {
            setemailError(error.response.data.email);
        }
        if(error.response && error.response.data && error.response.data.password1){
            setPassword1Error(error.response.data.password1)
        }
        if(error.response && error.response.data && error.response.data.password2){
            setPassword2Error(error.response.data.password2)
        }
        if(error.response && error.response.data && error.response.data.non_field_errors){
            seterror(error.response.data.non_field_errors)
        }
       
        }
    }
   
    const handleChangeUsername = (e) =>{
       setUsername(e.target.value)
        setFormDisabled(!e.target.value || !email || !password1 || !password2)
    }
    const handleChangeEmail = (e) =>{
       setEmail(e.target.value) 
       setFormDisabled(!username || !e.target.value || !password1 || !password2)  
      /* let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
      if (!emailRegex.test(email)) {
        setemailError("this is not valid email address!")
      }*/
    }
    const handleChangePassword1 = (e) =>{
            setPassword1(e.target.value)
            setFormDisabled(!username || !email || !e.target.value || !password2)
        } 
    const handleChangePassword2 = (e) =>{
            setPassword2( e.target.value)
            setFormDisabled(!username || !email || !password1 || !e.target.value )
     }
    return(
        <>
        <div>
            <form>    
                <label>Username:</label>
                <input 
                type="text" 
                value={username}
                 onChange={handleChangeUsername}
                placeholder="enter Username"
                required 
                />
                <br/>
                {usernameError && <p style={{color:'red'}}>{usernameError}</p>}
                <label>Email:</label>
                <input type="email" 
                onChange={handleChangeEmail}
                value={email}
                placeholder="enter Email"
                required
                />
                <br/>
                {emailError && <p style={{ color: "red"}}>{emailError}</p>}
                <label>Password:</label>
                <input type="password" 
                onChange={handleChangePassword1}
                value={password1}
                placeholder="enter password"
                required
                />
                <br/>
                {password1Error && <p style={{ color: "red" }}>{password1Error}</p>}
                <label>ConfirmPassword:</label>
                <input type="password"
                onChange={handleChangePassword2}
                value={password2}
                placeholder="enter confirm password"
                required
                /> 
                <br/>
                {password2Error && <p style={{color:'red'}}>{password2Error}</p>}

                <button type="button" onClick={handleSignup} disabled={isFormDisabled}>Submit</button>
                {error && <p style={{color:'red'}}>{error}</p>}
                {message && <p style={{color:'green'}}>{message}</p>}
            </form>
           <p>If you already SignUp.?<Link to='/login'>login</Link></p>
        </div>
        </>
    )
}