import axios from "axios"
import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

export function Product(){
    //debugger;
    const navigation = useNavigate()
    const [Product,setProduct] = useState([])
    const token = localStorage.getItem('token')
    const showProduct = async() =>{
        const items =  await axios({
            'method' : 'GET',
            'url' : 'http://127.0.0.1:8000/product/',
            headers:{
                'Authorization':`token ${token}`,
                "Content-Type":'application/json'
            }
        }).then((response) => {
            setProduct(response.data.results)
        }).catch((error)=>{
            console.log(error)
        })
        return items
    }
    useEffect(()=>{
        //debugger
        showProduct()
    },[])
    const addtoCart = (item) =>{
        debugger
    const isInCart = Product.some((Item) => Item.id === item);

     if (!isInCart) {
        debugger
       setProduct([ ...Product,item]);
       navigation(item,'/cart')
     }
    }
    return(
        <>
        {Product?.map((item,index)=>

<div className="card" key={index} style={{width:'20%', marginTop:'50px', float:'left'}}>
  
        <h3>{item.name}</h3> 
    <img src={item.image} className="top&tees" alt="Denim Jeans" style={{width:"100%", border:'1px solid black'}}/>
    <div style={{fontStyle:'italic',fontSize:'1rem'}}>
        <h5>{item.description}</h5>
        <h5>{item.price}</h5>
    </div>
        <p><button onClick={()=>addtoCart(item)} style={{textDecoration:'none',borderRadius:'10px'}}>Add Cart</button></p>
       {/* <NavLink to='/cart'>  <button onClick={()=>addtoCart(item)} style={{textDecoration:'none',borderRadius:'10px'}}>Add Cart</button></NavLink>*/}
</div>
)}
        </>
    )
}