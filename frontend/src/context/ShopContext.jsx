import { createContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const ShopContext = createContext(null);

const ShopcontextProvider = (props) => {
    const currency = "LKR";
    const deliveryCharge = 300;
    const [cartItem, setCartItem] = useState({})
    const navigate = useNavigate()
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    
    
    
    
    const addToCart = async (itemId, size) => {
        let cartData = structuredClone(cartItem)

        if (!size) {
            toast.error("Please select a size");
            return;
        }
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItem(cartData)

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', {
                    itemId,
                    size
                }, {
                    headers: { token }
                });
                toast.success("Item added to cart");
            } catch (error) {
                toast.error("Failed to add item to cart");
            }
        }
    }





    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalCount += cartItem[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }


    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItem)
        if (cartData[itemId] && cartData[itemId][size]) {
            cartData[itemId][size] = quantity;
            setCartItem(cartData)
        }

        if (token) {
            try {
        
                await axios.post(backendUrl + '/api/cart/update', {
                    itemId,
                    size,
                    quantity
                }, {
                    headers: { token }
                });
            } catch (error) {
                console.log("Error updating cart:", error);
            }
        }

    }

    const getCartTotal = () => {
        let totalAmount = 0;
        for (const items in cartItem) {
            let itemInfo = products.find((p) => p._id === items);
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItem[items][item];
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        return totalAmount;
    }


    const getAllProducts = async () => {
        try {

            const res = await axios.get(backendUrl + '/api/product/allproduct');
            
            if (res.data.success) {
                setProducts(res.data.product);
                // console.log(res.data)
            } else {
                console.log("Failed to fetch products");
                toast.error("Failed to fetch products");
            }

        } catch (error) {
            console.log("Error fetching products:", error);
            toast.error("Error fetching products");
        }
    }


    const getUserCart = async(token) => {
        try {
            
            const res = await axios.post(backendUrl + '/api/cart/get', {}, {
                headers: { token }
            });

            if (res.data.success) {
                setCartItem(res.data.cartData);
                // console.log("User cart data:", res.data.cartData);
            }

        } catch (error) {
            console.log("Error fetching user cart:", error);
        }
    }


    useEffect(() => {
        
        getAllProducts();
    }, []) 


    useEffect(() => {
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'));
        }
    }, [])


    const value = {
        products,
        currency,
        deliveryCharge,
        cartItem,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartTotal,
        navigate,
        backendUrl,
        setToken, token,
        setCartItem
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopcontextProvider;