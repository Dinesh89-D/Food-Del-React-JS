import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const StoreContext = createContext(null)

const StoreContextProvider = (props)=>{

    const [cartItems,setcartItems] = useState({});
    const url= "http://localhost:4000"
    const [token,setToken] = useState("");
    const[food_list,setFoodList] = useState([])

    const addToCart = (itemId) =>{
        //entry 
        if(!cartItems[itemId]){
           setcartItems((prev)=>({...prev,[itemId]:1}))
        }
        //suppose if the product available in that case we will increase tht
        else{
            setcartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart = (itemId)=>{
        setcartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount=()=>{
        let totalAmount = 0;
        //In loop using because of the cartitems are objects
        for(const item in cartItems)
        {
            if(cartItems[item]>0){
                let itemInfo = food_list.find((product)=>product._id===item);
            totalAmount+=itemInfo.price*cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async()=>{
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
    }
    useEffect(()=>{
        
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
            }
        }
        loadData();
    },[]);


    const contextValue ={
        food_list,
        cartItems,
        setcartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }



        return (
        <StoreContext.Provider value = {contextValue}>
                {props.children}
        </StoreContext.Provider>
        )
    }
export  default StoreContextProvider;