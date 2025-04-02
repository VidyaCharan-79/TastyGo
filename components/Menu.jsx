import React, {useEffect, useState} from 'react'
import Cart from "../components/Cart";
import { collection, addDoc, getDocs} from "firebase/firestore"; 
import { db } from '../firebaseConfig';
import { Button, Card, CardContent, Typography } from "@mui/material";
import Form from './Form'


const Menu = () => {
    const [count, setCounter] = useState(0);
  const [foods, setFoods] = useState([]); 
  const [name, setName] = useState();
  const [cart, setCart] = useState({});
  const value = "charan";
  const fetchFood = async () => {
    console.log("firebase is called");
    let foodArray = [];
    const querySnapshot = await getDocs(collection(db, "food")); 
    querySnapshot.forEach((doc) => {
    
      foodArray.push({...doc.data(),id:doc.id});
    });
    setFoods(foodArray);
    console.log(foods)
  }
  useEffect(() => {
    fetchFood();
  }, [])
  const add = () => {
    setCounter(count+1);
  }
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      
      setName(parsedUser.displayName);
    }
  }, []);
  const products = [
    
  ];
  const handleAdd = (item) => {
    let newItem = { ...cart };
    if (newItem[item.name]) newItem[item.name].stock += 1;
    else newItem[item.name] = { ...item, stock: 1 };
    console.log(cart);
    setCart(newItem);
  };
  // const deleteFood=async(id)=> {
  //   console.log(" to be deleted");
  //   await deleteDoc(doc(db,"foods",id));
  //   console.log("deleted");
  //   fetchFood();
  // }
  //     console.log("deleted");
  // const deleteFood=async(id)=> {
  //   try{
  //     const docref=doc(db,"Food",id)
  //     console.log(docref);
  //     await deleteDoc(docref);
  //     console.log("deleted");
  //     fetchFood();
  //   }
  //   catch(error) {
  //     console.error(error);
  //   }
  // }
  return (
    <>
    
    <div style={{ marginTop: "70px" }}>
    {foods.map((item) => {
      return (
        <Card style={{ margin: "10px" }}key={item.id}>
          <CardContent
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
             <Typography className='fitem'><img className='image' src={item.image} alt={item.name} /></Typography>
              <Typography>{item.name}</Typography>
              <Typography>{item.price}</Typography>
              <Typography>{item.stock}</Typography>
              <Typography>{item.category}</Typography>
              
      
            </div>
            <Button onClick={() => handleAdd(item)}>Add to Cart</Button>
            
          </CardContent>
        </Card> 
        
      );
      })}
  </div>
  <Cart cart={cart} /> 
  </>
  )
}

export default Menu
