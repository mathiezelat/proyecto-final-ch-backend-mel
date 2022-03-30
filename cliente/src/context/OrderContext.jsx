import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { CartContext } from './CartContext';
import services from '../services/orders'

export const OrderContext = createContext({});

export const OrderProviderContext = ({children}) => {
    const [orders, setOrders] = useState([]);

    const { isLoggedUser, user, token } = useContext(AuthContext);
    const { cart } = useContext(CartContext)

    useEffect(() => {
        if (isLoggedUser && user && token) {
            getOrdersByUserEmail(user.email, token);
        }
        return () => {
            setOrders([]);
        }
    }, [isLoggedUser, user, token]);

    const createOrder = async () => {
        try {
            const newOrder = await services.createOrder({
                cartId: cart.id,
            }, token);

            setOrders([...orders, newOrder]);
        } catch (error) {
            throw error;
        }
    }

    const getOrdersByUserEmail = async (email, token) => {
        try {
            const orders = await services.getOrdersByUserEmail(email, token);
            if (orders) {
                setOrders(orders);
            }
        } catch (error) {
            throw error;
        }
    }

    return (
        <OrderContext.Provider value={{orders, createOrder}} >
            {children}
        </OrderContext.Provider>
    )
}