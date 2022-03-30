import { createContext, useState, useContext, useEffect } from 'react';
import services from '../services/products';
import { AuthContext } from './AuthContext'

export const ProductContext = createContext({});

export const ProductProviderContext = ({children}) => {
    const [products, setProducts] = useState([]);

    const { isLoggedUser, token } = useContext(AuthContext);

    useEffect(() => {
        if (isLoggedUser && token) {
            getAllProducts(token);
        }
        return () => {
            setProducts([]);
        }
    }, [isLoggedUser, token])

    const createProduct = async (credentials) => {
        try {
            const product = await services.createProduct(credentials, token);

            setProducts([...products, product]);
        } catch (error) {
            throw error;
        }
    }

    const getAllProducts = async (token) => {
        try {
            const products = await services.getAllProducts(token);

            setProducts(products);
        } catch (error) {
            throw error;
        }
    }

    const deleteProduct = async (id) => {
        try {
            await services.deleteProduct(id, token);

            const filterProducts = products.filter((product) => product.id !== id);

            setProducts(filterProducts);
        } catch (error) {
            throw error;
        }
    }

    return (
        <ProductContext.Provider value={{products, createProduct, deleteProduct}}>
            {children}
        </ProductContext.Provider>
    )
}