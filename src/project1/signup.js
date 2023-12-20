import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function SignUp () {
   //debugger
const [username,setUsername] = useState('')
const [email,setEmail] = useState('')
const [password1,setPassword1] = useState('')
const [password2,setPassword2] = useState('')
const [error,seterror] = useState('')
const [usernameError,setUsernameError] = useState('')
const [emailError,setemailError] = useState('')
const [password1Error,setPassword1Error] = useState('')
const [password2Error,setPassword2Error] = useState('')
const [signupSuccess,setsignupSuccess]= useState('')


const data = JSON.stringify({
    'username':username,
    email:email,
    password1:password1,
    password2:password2
})

 const handleSignup = async() =>{
    debugger

   /*if(!username && !email && !password1 && !password1 && !password2){

   }*/
    debugger;
    //console.log("Data:",data)
        try{
            const user = await axios({
                'url': 'http://127.0.0.1:8000/register/',
                'method': 'POST',
                'headers': {
                            "Content-Type":'application/json',
                            'Accept':'application/json'
                        },
                        'data':data
            })
            return user

            
        }catch(error){
        if (error.response && error.response.data && error.response.data.email) {
                setemailError(error.response.data.email);
              }
              if(error.response && error.response.data && error.response.data.password1){
                setPassword1Error(error.response.data.password1)
              }


              if( username){
                setUsernameError('This username is already exist.')
            }
                if( email.matchAll  !== '/^[^\s@]+@[^\s@]+\.[^\s@]+$/' ){
            setemailError('Enter a correct Email address!')
                }
               if(password1.length < 8 || password1.matchAll === '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/'){
                setPassword1Error('password is too week and Does not match with its requirements')
              
               }
               if(password1 !== password2 ){
                setPassword2Error('The two password fields did not match.')
                
               }
               if(!username  || !email || !password1 || !password2){
                setUsernameError('This filed is required.')
                setemailError('This filed is required.')
                setPassword1Error('This field is required.')
                setPassword2Error('This field is required.')
                
               }
               
               if(username && email && password1 && password2){
                setsignupSuccess('User Signup successFully!')
               }
        }
        
 }

    return(
        <>
        <div>
            <form>    
                <label>Username:</label>
                <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="enter Username"
                required 
                />
                <br/>
                {usernameError && <p style={{color:'red'}}>{usernameError}</p>}
                <label>Email:</label>
                <input type="email" 
                onChange={(e) =>setEmail(e.target.value)}
                value={email}
                placeholder="enter Email"
                required
                />
                <br/>
                {emailError && <p style={{ color: "red"}}>{emailError}</p>}
                <label>Password:</label>
                <input type="password" 
                onChange={(e) => setPassword1(e.target.value)}
                value={password1}
                placeholder="enter password"
                required
                />
                <br/>
                {password1Error && <p style={{ color: "red" }}>{password1Error}</p>}
                <label>ConfirmPassword:</label>
                <input type="password"
                onChange={(e)=>setPassword2(e.target.value)}
                value={password2}
                placeholder="enter confirm password"
                required
                /> 
                <br/>
                {password2Error && <p style={{color:'red'}}>{password2Error}</p>}

                {signupSuccess && (
            <div style={{ color: "green" }}>
              <p>{signupSuccess}</p>
            </div>
          )? (<p>{error}</p>) : ''}
                <button type="button" onClick={handleSignup}>Submit</button>
            </form>
           
        </div>
        </>
    )
}