import { useContext } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { CartContext } from '../context/CartContext';
import { OrderContext } from './../context/OrderContext';

const LayoutProductsInCart = ({ item, handleDeleteProductToCart }) => (
	<Flex
		justifyContent="space-between"
		w="full"
		p="2"
		border="1px"
		borderColor="blackAlpha.300"
		borderRadius="md"
	>
		<Flex gap="2">
			<Text>{item.nombre}</Text>
		</Flex>
		<Flex gap="2">
			<Text>${item.precio}</Text>
			<Text>x{item.cantidad}</Text>
			<Button
				size="xs"
				colorScheme="red"
				variant="outline"
				onClick={() => handleDeleteProductToCart(item.id)}
			>
				Borrar
			</Button>
		</Flex>
	</Flex>
);

const CartListOfProductsLayout = ({
	items,
	handleDeleteCart,
	handleCreateOrder,
	handleDeleteProductToCart,
}) => (
	<Box>
		<Flex
			flexDirection="column"
			gap="2"
			w="full"
			border="1px"
			borderColor="blackAlpha.50"
			borderRadius="sm"
			p="2"
		>
			{!items.length ? (
				<Text>No hay productos en el carrito</Text>
			) : (
				<Flex flexDirection="column" gap="2" w="full">
					{items.map(item => (
						<LayoutProductsInCart
							key={item.id}
							item={item}
							handleDeleteProductToCart={handleDeleteProductToCart}
						/>
					))}
					<Flex flexDirection="column" gap="2" w="full">
						<Flex justifyContent="space-between" w="full">
							<Text>Cantidad de productos: {items.length}</Text>
							<Text>
								Total: $
								{items.reduce((acc, curr) => {
									return acc + curr.precio * curr.cantidad;
								}, 0)}
							</Text>
						</Flex>
						<Button colorScheme="blue" onClick={handleCreateOrder}>
							Crear orden
						</Button>
						<Button
							colorScheme="red"
							variant="outline"
							onClick={handleDeleteCart}
						>
							Borrar carrito
						</Button>
					</Flex>
				</Flex>
			)}
		</Flex>
	</Box>
);

const Cart = () => {
	const { createCart, cart, deleteProductToCart, deleteCart } =
		useContext(CartContext);
	const { createOrder } = useContext(OrderContext);

	const handleCreateCart = async () => {
		try {
			await createCart();
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteCart = async () => {
		try {
			await deleteCart();
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteProductToCart = async productId => {
		try {
			await deleteProductToCart(productId);
		} catch (error) {
			console.error(error);
		}
	};

	const handleCreateOrder = async () => {
		try {
			await createOrder();
			await deleteCart();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Box my="4">
			<Text fontSize="2xl" mb="1">
				Carrito
			</Text>
			{cart ? (
				<CartListOfProductsLayout
					items={cart.items}
					handleCreateCart={handleCreateCart}
					handleDeleteCart={handleDeleteCart}
					handleCreateOrder={handleCreateOrder}
					handleDeleteProductToCart={handleDeleteProductToCart}
				/>
			) : (
				<Button onClick={handleCreateCart}>Crear Carrito</Button>
			)}
		</Box>
	);
};

export default Cart;
