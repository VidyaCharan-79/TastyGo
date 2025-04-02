import Form from './Form'
import React, {useEffect, useState} from 'react'
import { collection, addDoc, getDocs,deleteDoc,doc} from "firebase/firestore"; 
import { db } from '../firebaseConfig';
import { Button, Card, CardContent, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
const Admin = () => {
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
    const deleteFood=async(id)=> {
      console.log(" to be deleted");
      await deleteDoc(doc(db,"foods",id));
      console.log("deleted");
      fetchFood();
    }
  return (
    <div>
      <Form/>
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
            {/* <Button onClick={()=> deleteFood(item.id)}>Delete</Button> */}
            <Button onClick={()=> deleteFood(item.id)}variant="outlined" startIcon={<DeleteIcon/>}></Button>
            <Button onClick={()=> deleteFood(item.id)}>Update</Button>
          </CardContent>
        </Card> 
        
      );
      })}
      </div>
  </>
  </div>
  )
  }

  

export default Admin
