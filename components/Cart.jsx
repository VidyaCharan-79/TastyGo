import React, { useDebugValue, useEffect } from "react";
import {loadStripe} from "@stripe/stripe-js";
import { Button } from "@mui/material";

const stripePromise=loadStripe("pk_test_51Q5VfQKagixpfW9xVeERV3U0PYMTBFe8YYjP0JL4P4pWdykpJzz89BY1fZLjcK1swBfnoMAYvvDwlfoS7EvHrEnf00rdcOqZoZ");
const handleCheckout=async()=>
{
  const response =await
  fetch("http://localhost:4242/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
    },
    body:JSON.stringify({
      items: Object.entries(Cart).map(([key,item]) => ({
        name: item.name,
        price:item.price,
        stock:item.stock,
      })),
    }),
  });
  const session =await response.json();
  const Stripe =await stripePromise;
  const {error}=await stripePromise.redirectToCheckout({
    session:session.id,
  });
  if(error) {
    console.log("Stripe checkout error: ",error);
  }

};
const Cart = (props) => {
  const cart = props.cart;
  useEffect(() => {
    console.log(cart);
  }, []);
  return (
    
    <div>
      <ul>
        {Object.keys(cart).length > 0 ? (
          Object.entries(cart).map(([key, item]) => {
            return (
              
              <li key={key}>
                {item.name} - Rs. {item.price} x {item.stock}
                
              </li>
            );
          })
        ) : (
          <h1>No items to display</h1>
           
        )}
      </ul>
      <Button onClick={handleCheckout}>Checkout</Button>
      </div>
      
      
      
  );
};

export default Cart;