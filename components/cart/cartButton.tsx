import {useState, useEffect, } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import type { Stock } from "../../types";
import { useCookie } from "../useCookie";


const CartButton = ({ stock }: {stock: Stock}) => {
    
    // const [cookieName, setCookieName] = useState("");
    const userID = useCookie();

    console.log(userID);

    // const data = {
    //     itemId: stock.id,
    //     cookieName: cookieName,
        
    // };

    const addCartItem = async () => {
        if (!userID === true) {
            Router.push("/login/loginPage");
            // if(localStorage.getItem("shoppingCart")){
            //   const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart") || "{}");
            //   shoppingCart.push(data);
            //   localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
            // }else{
            //   localStorage.setItem('shoppingCart', JSON.stringify([data]));
            // }
        } else { 
          const res = await fetch(`http://localhost:8000/shoppingCart/${userID}`);
          const user = await res.json();
          user.stockID.push(stock.id);
          user.stock.push(stock);

          fetch(`http://localhost:8000/shoppingCart/${userID}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "deleted": false,
                "stockID": user.stockID,
                "stock": user.stock
                }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('Success:', data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
    }

    return (
        <button onClick={addCartItem}>カートへ追加</button>
    );
}

export default CartButton;
