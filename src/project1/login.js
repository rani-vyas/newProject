import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function LoginUser () {

    const [username,setusername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const  [error,setError] = useState('')
    const [usernameError,setusernameError] = useState('')
    const [emailError,setEmailError] =useState('')
    const [passwordError,setPasswordError]= useState('')
    const [message,setmessage] = useState('')
   const [isDisable,setisDisable] = useState(true)


 const data = JSON.stringify({
    'username':username,
    email:email,
    password:password
})
    const login = async() =>{

        if(username === username || email === email || password === password){
            setmessage(username + ' is successfully login!')
            setisDisable(false)
        }

        if(!username || username !== username ){
            setusernameError('This username does not exist!')
        }

        if(!email || email !== email){
            setEmailError('Check Your email!')
        }

        if( password !== password){
            setPasswordError('This Field is required!')
        }
        if(!username && !email && !password){
            setusernameError('This Field is required')
            setEmailError('This Field is required')
            setPasswordError('This Field is required')
        }
        if(!username){
            setusernameError('This Field is required')
        }
        if(!email){
            setEmailError('This Field is required')
        }
        if(!password){
            setPasswordError('This Field is required')
        }
        if(username === '' || email === '' || password === ''){
            setError('fill this blank fields.')
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
        }catch(error){
            console.error('error',error)
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
            onChange={(e) => setusername(e.target.value)} />
            <br/>
            {usernameError && <p style={{color:'red'}}>{usernameError}</p>}
            <label>Enter Email:</label>
            <input 
            type="email" 
            placeholder="email" 
            value={email} 
            onError={setEmailError}
            onChange={(e) => setEmail(e.target.value)}/>
            <br/>
            {emailError && <p style={{color: 'red'}}>{emailError}</p>}
            <label>Enter Password:</label>
            <input 
            type="password" 
            placeholder="password" 
            value={password} 
            onError={setPasswordError}
            onChange={(e) => setPassword(e.target.value)}/>
            <br/>
            {passwordError && <p style={{color : 'red'}}>{passwordError}</p>}

            <button type="button" onClick={login}  onChange={setisDisable}>Login</button>
          
           {username && email && password&&
            <p type="text" style={{color:'green'}}>{message}</p>  }
          
        </form>
        
        </div>
        </>
    )
}