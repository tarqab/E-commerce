import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


export const cartContext = createContext();


export function CartContextProvider({ children }) {



    const [cartProducts, setCartProducts] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [cartID, setCartID] = useState(null);

  

    async function addProuductToCart(productID) {
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", { "productId": productID },
                { headers: { token: localStorage.getItem('tkn') } }
            )
            setNumOfCartItems(data.numOfCartItems);
            setTotalPrice(data.data.totalCartPrice);

             getUserCart();
            return data
        }

        catch (error) {
            console.log(error);
        }
    }


    async function getUserCart() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: {
                    token: localStorage.getItem("tkn")
                }
            })
            setNumOfCartItems(data.numOfCartItems);
            setTotalPrice(data.data.totalCartPrice);
            setCartProducts(data.data.products)
            setCartID(data.data._id)

        } catch (error) {
            console.log(error);
        }
    }


    async function deleteProduct(productID) {

        try {

            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productID}`, {
                headers: { token: localStorage.getItem('tkn') }
            })
            setNumOfCartItems(data.numOfCartItems);
            setTotalPrice(data.data.totalCartPrice);
            setCartProducts(data.data.products)
            return data

        } catch (error) {
            console.log("error happened in delete Product Function ", error);
        }
    }


    async function updateCount(idProduct, count) {
        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${idProduct}`, { "count": count },
                { headers: { token: localStorage.getItem("tkn") } })
            setNumOfCartItems(data.numOfCartItems);
            setTotalPrice(data.data.totalCartPrice);
            setCartProducts(data.data.products)

            return data

        } catch (error) {
            console.log(error);

        }
    }
    async function confirmOnlinePayment(e, shippingAddress) {
        e.preventDefault();


        try {
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}`,
                shippingAddress,
                {
                    headers: { token: localStorage.getItem("tkn") },
                    params: { url: "http://localhost:3000" },
                }
            );
            if (data.status === "success") {
                toast.success("payment is done");
                console.log(data.status);
               
            }
            
            window.open(data.session.url, "_blank");
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(function () {
        getUserCart();

    }, [])

    return <cartContext.Provider value={{
        addProuductToCart, getUserCart, cartProducts,
        totalPrice,
        numOfCartItems,
        deleteProduct,
        updateCount,
        cartID,
        setCartProducts,
        setTotalPrice,
        setNumOfCartItems,
        confirmOnlinePayment,

    }}>
        {children}

    </cartContext.Provider>
}