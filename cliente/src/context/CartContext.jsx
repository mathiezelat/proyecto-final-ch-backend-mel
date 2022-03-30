import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import services from '../services/cart';

export const CartContext = createContext({});

export const CartProviderContext = ({children}) => {
    const [cart, setCart] = useState(null);

    const { isLoggedUser, user, token} = useContext(AuthContext);

    useEffect(() => {
        if (isLoggedUser && user && token) {
            getCartByUserEmail(user.email, token);
        }
        return () => {
            setCart(null);
        }
    }, [isLoggedUser, user, token]);

    const createCart = async () => {
        try {
            const newCart = await services.createCart({
                userId: user.uid,
            }, token);

            setCart(newCart);
        } catch (error) {
            throw error;
        }
    }

    const createCartAndAddProduct = async (ids) => {
        try {
            const newCart = await services.createCart({
                userId: user.uid,
            }, token);
            
            const updatedCart = await services.addProductToCart(newCart.id, {
                productos: ids,
            }, token);
            
            setCart(updatedCart);
        } catch (error) {
            throw error;
        }
    }

    const getCartByUserEmail = async (email, token) => {
        try {
            const cart = await services.getCartByUserEmail(email, token);
            if (cart) {
                setCart(cart);
            }
        } catch (error) {
            throw error;
        }
    }

    const addProductToCart = async (ids) => {
        try {
            const updatedCart = await services.addProductToCart(cart.id, {
                productos: ids,
            }, token);
            
            setCart(updatedCart);
        } catch (error) {
            throw error;
        }
    }

    const deleteProductToCart = async(productId) => {
        try {
            const deletedProduct = await services.deleteProductToCart(cart.id, productId, token);

            setCart(deletedProduct);
        } catch (error) {
            throw error;
        }
    }

    const deleteCart = async () => {
        try {
            await services.deleteCart(cart.id, token);

            setCart(null);
        } catch (error) {
            throw error;
        }
    }

    return (
        <CartContext.Provider value={{cart, createCart, createCartAndAddProduct, addProductToCart, deleteProductToCart, deleteCart}} >
            {children}
        </CartContext.Provider>
    )
}