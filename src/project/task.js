import React, { useEffect, useState } from 'react'
import axios from'axios';
import './task.css';
export function IsoCode (){
    //debugger;
  const [countries,setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
 const [states, setSelectedstates] = useState([]);
 const [currentState,setcurrentState] = useState([]);
 const [inputSearch,setInputsearch] = useState('');

useEffect(()=>{
    //debugger;
    const fetchData = async () =>{
        try{
            const countrydata = await axios.get('https://countriesnow.space/api/v0.1/countries/states')
            setCountries(countrydata.data.data)
           // console.log(setcountries(data.data.data.countries))
            }catch(error){
                console.error(error);
            }       
    }
    fetchData()
},[])

useEffect(()=>{
    //debugger;
    const state =countries 
    .find((country) => country.name === selectedCountry )?.states 
    console.log(state)
    setSelectedstates(state)
    setcurrentState(state)
    if(!state || state.length === 0){
            console.log('no Data found')
        }
    
},[selectedCountry])
const handleCountryChange =(event)=>{
//debugger;
    const selectedCountry = event.target.value;
        setSelectedCountry(selectedCountry)
  }

const handlesearchState = (event) =>{
const selectedstate = event.target.value;
setInputsearch(selectedstate)

setSelectedstates(currentState?.filter((item) => item.name.toLowerCase().indexOf(selectedstate) > -1))
}


return(
<>
    <div>
        <h1>List of Countries and Cities</h1>
        <label htmlFor="countryDropdown">Select Country:</label>
        <select  onChange={handleCountryChange} value={selectedCountry}>
        <option value="" disabled>
          -- Select a Country --
        </option>
        {Array.isArray(countries) &&
          countries.map((item, index) => (
            <option id='option-id' key={index} value={item.name}>
              {item.name}
            </option>
            
          ))}
      </select>
      <br/>
     
      <label htmlFor='searchstate'>Search State : </label>
      <input id='input-id' type='text' onChange={handlesearchState}  placeholder='Serach State' />
     
      { states?.length === 0 ? (
                <p>No Data Found!</p>
            ) : (
      <table className='myTable' style={{width:'30%', marginTop:'10%'}} >
        <thead >
            <tr className='tr-class'>
            <th>State_Id</th>
            <th>State_Name</th>
            <th>State_Code</th>
            </tr>
        </thead>
        <tbody>
        {states?.map((state,index)=>( 
       <tr key={index}>
        <td>{index}</td>
       <td>{state.name}</td>
       <td>{state.state_code}</td>
       </tr>
        ))
       }
       </tbody>
    </table>
    )}
      </div>
      
</>
)
    }