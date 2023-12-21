import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function LoginUser () {

    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const  [error,setError] = useState('')
    const [usernameError,setusernameError] = useState('')
    const [emailError,setEmailError] =useState('')
    const [passwordError,setPasswordError]= useState('')
    const [message,setmessage] = useState('')
   const [isFormDisable,setisFormDisable] = useState(true)


 const data = JSON.stringify({
    'username':username,
    email:email,
    password:password
})
    const login = async(e) =>{
        e.preventDefault();

        
            //setisFormDisable(false)
        
        if(!email || email !== email){
            setEmailError('Check Your email!')
        }

        if( password !== password){
            setPasswordError('Check your password')
        }

        try{
            const logindata = await axios({
                    'url':'http://127.0.0.1:8000/login/',
                    'method' : 'POST',
                    'headers':{
                        'Content-Type':'application/json',
                        'Accept' : 'application/json'
                    },
                    'data':data
            });
            const token = logindata.data.key
            console.log(token)
            if(token){
                localStorage.setItem('token',token)
            }
            else{
                console.log('no token!')
            }

            if(username && email && password && password){
                setmessage('User Successfully login.')
             }

        }catch(error){
            console.error('error',error)
            if(error.response && error.response.data && error.response.data.username){
                    setusernameError(error.response.data.username)
            }
            if(error.response && error.response.data && error.response.data.email){
                setEmailError(error.response.data.email)
            }
            if(error.response && error.response.data && error.response.data.password){
                setPasswordError(error.response.data.password)
            }
           if( error.response.data && error.response.data.non_field_errors){
                setError(error.response.data.non_field_errors)
            }
        }
    }
    const handleChangeUsername = (e) =>{
        setUsername(e.target.value)
         setisFormDisable(!e.target.value || !email || !password)
         if(username !== username){
            setisFormDisable(true)
         }
         
     }
     const handleChangeEmail = (e) =>{
        setEmail(e.target.value)    
        setisFormDisable(!username || !e.target.value || !password ) 
        if(email !== '/^[^\s@]+@[^\s@]+\.[^\s@]+$/'){
            setisFormDisable(true)
        }
           
      }
     const handleChangePassword = (e) =>{
             setPassword( e.target.value)
             setisFormDisable(!username || !email || !e.target.value )
            if(password !== password){
                setisFormDisable(true)
            }
         } 

     
    return(
        <>
        <div>
            <form>
            <label>Enter Username:</label>
            <input 
            type="text" 
            placeholder="username" 
            value={username} 
            onChange={handleChangeUsername} 
            />
            <br/>
            {usernameError && <p style={{color:'red'}}>{usernameError}</p>}
            <label>Enter Email:</label>
            <input 
            type="email" 
            placeholder="email" 
            value={email} 
            onChange={handleChangeEmail}/>
            <br/>
            {emailError && <p style={{color: 'red'}}>{emailError}</p>}
            <label>Enter Password:</label>
            <input 
            type="password" 
            placeholder="password" 
            value={password} 
            onChange={handleChangePassword }/>
            <br/>
            {passwordError && <p style={{color : 'red'}}>{passwordError}</p>}

            <button type="button" onClick={login} disabled={isFormDisable} >Login</button>
            {error && <p style={{color:'red'}}>{error}</p>}
            {message && <p style={{color:'green'}}>{message}</p>}
        </form>
        <p>If you didn't have any account? <Link to='/signup'>Signup</Link></p>
        </div>
        </>
    )
}