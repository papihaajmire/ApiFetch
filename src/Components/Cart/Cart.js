// import { useEffect, useState } from "react";

// const Cart = ({cartData})=>{

//   const [cart, setCart]= useState(cartData)
//   useEffect(()=>{
//     setCart(cartData)
//   },[cartData])
//   return(
//     <div className="cart_section">
//       <h1>Your List</h1>
//       <div>
//         {
//           cart.map((product,index)=>{
//             <div key={index} className="cart_item">
//               <span>
//                     {product.title}
//               </span>
              
//             </div>
//           })
//         }
//       </div>
//     </div>
//   )
// }
// export default Cart;

















// import React from 'react';

// function Cart({ cartItems, totalAmount }) {
//   return (
//     <div>
//       <h1>Cart</h1>
//       <div className="cart-section">
//         <h2>Cart Items</h2>
//         <ul>
//           {cartItems.map(cartItem => (
//             <li key={cartItem.id}>
//               {cartItem.category} - {cartItem.title} - Rs{cartItem.price}
//             </li>
//           ))}
//         </ul>
//         <p>Total Amount: Rs{totalAmount}</p>
//       </div>
//     </div>
//   );
// }

// export default Cart;

