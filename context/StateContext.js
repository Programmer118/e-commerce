import React ,{useContext,createContext,useState,useEffect} from 'react';
import { toast } from 'react-hot-toast';


const Context = createContext();

export const StateContext = ({children}) =>{
    const [showCart, setShowCart] = useState(false);

    const [cartItem, setCartItem] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)

    const [totalQuantities, setTotalQuantities] = useState(0)

    const [qty, setQty] = useState(1)

    let foundProduct;
    let index;

 
 
 
    /**
     * If the product is already in the cart, then add the quantity to the total price and total
     * quantity, and update the cart item quantity.
     * @param product - is the product object that is being added to the cart
     * @param quantity - the quantity of the product that the user wants to add to the cart
     */
    const onAdd = (product,quantity) =>{
        const checkProductInCart = cartItem.find((item)=>item._id === product._id);

        setTotalPrice((prevTotalPrice)=>prevTotalPrice + product.price * quantity)
        setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities + quantity)
        if(checkProductInCart){

            const updatedCartItem = cartItem.map((cartProduct)=>{
                if(cartProduct._id === product._id)return{
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
            setCartItem(updatedCartItem);
        }else{
            product.quantity = quantity
            
            setCartItem([...cartItem, {...product}])
        }
        toast.success(`${qty} ${product.name} added to cart.`)
    }
    
    
    
    
    const onRemove = (product) => {
        foundProduct = cartItem.find((item)=> item._id === product._id)
        const newCartItem = cartItem.filter((item)=>item._id !== product._id)
        
        setTotalPrice((prevTotalPrice)=> prevTotalPrice-foundProduct.price*foundProduct.quantity)
        setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities-foundProduct.quantity)
        setCartItem(newCartItem)
        toast.success(`${qty} ${product.name} Removed from cart.`)
    }




    const toggleCartItemQuantity = (id,value) => {
        foundProduct = cartItem.find((item)=> item._id === id)
        index = cartItem.findIndex((product)=> product._id === id)
        const newCartItem = cartItem.filter((item)=>item._id !== id)

        if(value === 'inc'){
            setCartItem([...newCartItem,{...foundProduct,quantity:foundProduct.quantity + 1}])

            setTotalPrice((prevTotalPrice)=> prevTotalPrice + foundProduct.price)

            setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities + 1)
        }else if(value === 'dec'){
            if(foundProduct.quantity > 1){
            setCartItem([...newCartItem,{...foundProduct,quantity:foundProduct.quantity - 1}])

            setTotalPrice((prevTotalPrice)=> prevTotalPrice - foundProduct.price)

            setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities - 1)
        }
    }
}




    /**
     * The function incQty() will set the value of qty to the previous value of qty plus 1.
     */
    const incQty = () => {
        setQty(prevQty => prevQty + 1);
      
        setCartItem(prevCartItem =>
          prevCartItem.map(item => {
            if (item._id === id) {
              return { ...item, quantity: foundProduct.quantity + 1 };
            }
            return item;
          })
        );
      };
 
 
    /**
     * If the current quantity is less than 1, then return 1, otherwise return the current quantity
     * minus 1.
     */
    const decQty = ()=>{
        setQty((prevQty)=>{
            if(prevQty-1 < 1) return 1;
           return  prevQty - 1;
        });
    }



/* Returning the context provider with the value of the state. */
    return(
        <Context.Provider value={{
            showCart,
            cartItem,
            qty,
            totalPrice,
            setTotalPrice,
            totalQuantities,
            setTotalQuantities,
            incQty,
            decQty,
            onAdd,
            setShowCart,
            toggleCartItemQuantity,
            onRemove,
            setCartItem,
        }}
        >
            {children}
        </Context.Provider>
    )
}


/**
 * `useStateContext` is a function that returns the `Context` object
 */
export const useStateContext = ()=> useContext(Context)