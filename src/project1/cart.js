import axios from "axios"
import { useEffect, useState } from "react"

export function CartPage () {

    const [user,setUser] = useState('')
    const [image,setimage] = useState()
    const [product,setProduct] = useState()
    const [product_qty,setproduct_qty] = useState(1)
    const [cartItems, setCartItems] = useState([]);
    const [selectItem,setSelectItem] = useState(null);
    const [error,setError] = useState('')

   
    const data = JSON.stringify({
       user:user,
      image,
      product:product,
      product_qty:product_qty,
    })
    console.log(data)
    const token = localStorage.getItem('token')
  const addCart = async() =>{
try{
      const Product = await axios.post('http://127.0.0.1:8000/cart/',
        {
          headers:{
          "Authorization":`token ${token}`,
          'Accept':'application/json'
        },
        "data":data,
        })
        if(user === user.id){
          setUser(user.response && user.response.data && user.response.data.results)
        }
        if(product === product.id){
          setProduct(product.response && product.response.data && product.response.data.results)
        }
        
      const addedCartItem = Product.data;
      console.log('addedCartItem',addedCartItem)
      setCartItems([...cartItems]);

    }catch(error){
      console.log(error)
      if(error.response.data && error.response.data.product)
      {
        setError(error.response.data.product)
        console.log('error:',error.response.data.product)
      }
    }
  }
  useEffect(()=>{ 
    if(product && product.id === selectItem.id){
      setSelectItem(product);
  }
  addCart(product);
}, [product]);
    return (
        <>
        <h1>Cart Page</h1>
      <div>
        {cartItems?.map((item,index)=>
        <div key={index} style={{border:'1px solid black'}}>
          {item.user}
          {user && <p style={{color:'black'}}>{user}</p>}
        <h2><img src={item.image} alt="img" style={{width:'40%', marginLeft:'10px' , border:'1px solid black'}}/></h2>
       {/* <h4>{item.product}</h4> */}
          {product && <p style={{color:'black'}}>{product}</p>}
        <h5>{item.product_qty}</h5>
       </div>
        )}
      </div>
      {error && <p style={{color:'red'}}>Product Error:{error}</p>}      
        </>
    )
}