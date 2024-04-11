import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DataFetching() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
      const data = response.data;
      setProducts(data.categories);
      setFilteredProducts(data.categories);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const showProducts = (category) => {
    if (category.toLowerCase() === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(cat => cat.category_name.toLowerCase() === category.toLowerCase());
      setFilteredProducts(filtered);
    }
  };

  const searchProducts = (searchTerm) => {
    const filtered = products.filter(categoryData => {
      return categoryData.category_products.some(product => {
        const brandMatch = product.vendor.toLowerCase().includes(searchTerm.toLowerCase());
        const titleMatch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        return brandMatch || titleMatch;
      });
    });
    setFilteredProducts(filtered);
  };

  const addToCart = (product) => {
    const updatedCartItems = [...cartItems, product];
    setCartItems(updatedCartItems);
    setTotalItems(totalItems + 1);
    setShowPopup(true);
    setPopupMessage('Item added to cart');
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCartItems);
    setTotalItems(totalItems - 1);
    setShowPopup(true);
    setPopupMessage('Item removed from cart');
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div>
      <h1>Our Products</h1>
      <div className="buttons">
        <button onClick={() => showProducts('all')}>All</button>
        <button onClick={() => showProducts('Men')}>Mens</button>
        <button onClick={() => showProducts('Women')}>Womens</button>
        <button onClick={() => showProducts('Kids')}>Kids</button>
      </div>

      {/* Search form */}
      <div className="search-container">
        <input type="text" id="search-input" placeholder="Search Here" onChange={(e) => searchProducts(e.target.value)} />

        {/* Cart Section
      <div className="cart-section">
        <h2>Cart</h2>
        <div>
          {cartItems.map(item => (
            <div key={item.id}>
              <p>{item.title}</p>
              <p>Price: {item.price}</p>
            </div>
          ))}
        </div>
        <p>Total Amount: {cartItems.reduce((total, item) => total + item.price, 0)}</p>
      </div> */}
      </div>

      <div className="products-container">
        {filteredProducts.map(categoryData => {
          return categoryData.category_products.map(product => (
            <div className="product" key={product.id}>
              <div className="productContainer">
                <img src={product.image} alt={product.title} />
                <h5>{product.title}</h5>
                <p>Price: {product.price}</p>
                <p>Vendor: {product.vendor}</p>
                {product.badge_text && <span className="badge">{product.badge_text}</span>}
                <button onClick={() => addToCart(product)} id='add'>Add to Cart</button>
              </div>
            </div>
          ));
        })}
      </div>

      <div className="container-fluid shadow-lg p-3 mb-5 bg-body-tertiary rounded">

<div className="cart-container">
  <p>Cart Items: {totalItems}</p>
  <p>Total Amount: {cartItems.reduce((total, item) => total + item.price, 0)}</p>
</div>
{showPopup && <div className="popup">{popupMessage}</div>}
{cartItems.length > 0 &&
  <div className="cart-items">
    <h2>Cart</h2>
    {cartItems.map(item => (
      <div key={item.id}>
        <p>{item.title}</p>
        <button className="re-to-cart-button" onClick={() => removeFromCart(item.id)}>Remove</button>
      </div>
    ))}
  </div>
}
</div>

    </div>
  );
}

export default DataFetching;



























// import React, { useEffect,useState } from 'react';
// import axios from 'axios';

// const DataFetching = () => {
//   const [categories, setCategories] = useState([])

//   useEffect(()=>{
//     axios.get('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
//     .then(res=>(setCategories(res.data.categories)))
//     .catch(err=>console.log(err));
//   },[])

//   let finalproduct=setCategories;
//   let productContainer=document.getElementById('products')

//   finalproduct.categories.map(element => {
//     if(!categories || element.category_name.toLowerCase()===categories.toLowerCase()){
//       element.category_products.map(product =>{
//         productContainer.innerHTML +=`
//         <div class="card">
//         <div class="image-container"><img src="${product.image}" alt="" />
//         <h3>${product.title}</h3>
//         <p>${product.price}</p>
//         <p>${product.vendor}</p>
//         </div>
//         </div>
//         `
//       } )
//     }
//     console.log(element);
//   })

//   // Search Button click
// document.getElementById("search").addEventListener
// ("click",()=>{
//     //initializations
//     let searchInput = document.getElementById("search-input").value;
//     let elements = document.querySelectorAll(".title");
//     let cards = document.querySelectorAll(".card");
    
//     //loop through all elements
//     elements.map((element,index)=>{
//         //check if text includes the search value
//         if(element.innerText.includes(searchInput.toUpperCase())){
//             //display matching cards
//             cards[index].classList.remove("hide");
//         }
//         else{
//             //hide other
//             cards[index].classList.add("hide");
//         }
//     });
// });


//   return (
//     <div id="search-container">
//             <input type="search" id="search-input" placeholder="Searvh product name here..."/>
//             <button id="search">Search</button>
//               <div>
// //         <button onClick={() => DataFetching('men')}>Men</button>
// //         <button onClick={() => DataFetching('women')}>Women</button>
// //         <button onClick={() => DataFetching('kids')}>Kids</button>
//           </div>
// //     

//             <div id='products'>
   
//             </div>
//         </div>

    
//   );
// }

// export default DataFetching;





// import React from 'react';
// import { useState } from 'react';
// import { useEffect } from 'react';
// import axios from 'axios';


// function DataFetching() {
//     const [clothes, setClothes] = useState([]);
//     const [filteredClothes, setFilteredClothes] = useState([]);
//     const [loading, setLoading] = useState(true);
  
//     useEffect(() => {
//       axios.get('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
//         .then(response => {
//           setClothes(response.data.categories);
//           setFilteredClothes(response.data.categories);
//           setLoading(false);
//         })
//         .catch(error => {
//           console.error('Error fetching data:', error);
//           setLoading(false);
//         });
//     }, []);
  
//     const FilteredClothes = (category) => {
//       const filtered = clothes.filter(item => item.category.toLowerCase() === category.toLowerCase());
//       setFilteredClothes(filtered);
//     };
  
//     const renderClothes = () => {
//       return filteredClothes.categories.flatmap(item => (
//         <div className="card">
//             <img src={item.image} alt="" />
//                 <div className="card-body">
//                     <h5>{item.title}</h5>
//                 </div>
//         </div>
//       ));
//     };
//     if (loading) {
//       return <p>Loading...</p>;
//     }
  
//     return (
//       <div>
//         <button onClick={() => DataFetching('men')}>Men</button>
//         <button onClick={() => DataFetching('women')}>Women</button>
//         <button onClick={() => DataFetching('kids')}>Kids</button>
//         <div>
//           {renderClothes()}
//         </div>
//       </div>
//     );
//   }

// export default DataFetching;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios'

// const DataFetching = () => {
//     const [products, setProducts] = useState([])
//     useEffect(() => {
//         axios.get('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
//             .then(res => { setProducts(res.data) })
//             .catch(err => console.log(err))
//     }, [])

    
//     return (
//         <div>
//             <div className='container mt-5'>
//                 <h1>All Products</h1>
//                 <div className="row">
//                     <div className="col-md-3">
//                         <button className="btn btn-warning w-100 mb-4">Men</button>
//                         <button className="btn btn-warning w-100 mb-4">Women</button>
//                         <button className="btn btn-warning w-100 mb-4">Kids</button>
//                     </div>
//                         {products.map((val) => {
//                         <div className='col-md-3'>
//                             <div className="card">
//                                 <img src={val.image} alt="" />
//                                 <div className="card-body">
//                                     <h5>{val.title}</h5>
//                                 </div>
//                             </div>
//                         </div>
//                     })}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default DataFetching;

