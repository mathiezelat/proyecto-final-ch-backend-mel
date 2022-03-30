import { Box, Flex, Text, Image, Button } from '@chakra-ui/react';
import { useContext } from 'react';
import { CartContext } from './../context/CartContext';
import { ProductContext } from './../context/ProductContext';

const ItemProduct = ({product, handleDeleteProduct, handleAddProductToCart}) => (
    <Flex w="160px" flexDirection="column" background="blackAlpha.50" borderRadius="lg" overflow="hidden">
        <Box>
            <Image 
                boxSize='160px'
                objectFit='cover'
                src={product.foto} 
                alt="Imagen de producto" 
            />
        </Box>
        <Box px="2" mb="-1" color="blue.500">
            <Text as='i' fontSize="xs">{product.categoria}</Text>
        </Box>
        <Flex justifyContent="space-between" alignItems="center" px="2">
            <Text fontSize="xl">{product.nombre}</Text> 
            <Text fontSize="sm">x{product.stock}</Text> 
        </Flex>
        <Box px="2">
            <Text fontSize="xs">
                {product.descripcion}
            </Text>
        </Box>
        <Box px="2">
            <Text fontSize="sm">${product.precio}</Text>
        </Box>
        <Flex gap="2" flexDirection="column" p="2">
            <Button size='xs' colorScheme="blue" onClick={() => handleAddProductToCart(product.id) }>
                Agregar al carrito
            </Button>
            <Button size='xs' colorScheme="red" variant='outline' onClick={() => handleDeleteProduct(product.id) }>
                Eliminar producto
            </Button>
        </Flex>
    </Flex>
)

const ListOfProducts = () => {
    const { products, deleteProduct } = useContext(ProductContext);
    const { cart, createCartAndAddProduct, addProductToCart } = useContext(CartContext);

    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddProductToCart = async (id) => {
        try {
            if(!cart) {
                await createCartAndAddProduct([id]);
            } else {
                await addProductToCart([id]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box my="4">
            <Text fontSize="2xl" mb="1" >
                Productos
            </Text>
            <Flex wrap="wrap" gap="5">
                {products.map((product) => <ItemProduct key={product.id} product={product} handleDeleteProduct={handleDeleteProduct} handleAddProductToCart={handleAddProductToCart} />)}
            </Flex>
        </Box>
    )
}

export default ListOfProducts