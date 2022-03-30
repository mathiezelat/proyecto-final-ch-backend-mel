import { Button, Container, Flex, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ListOfProducts from './../components/ListOfProducts';
import Cart from './../components/Cart';
import Orders from './../components/Orders';
import ProductForm from './../components/ProductForm';
import Chat from './../components/Chat';
import UserInfo from '../components/UserInfo';

export const Home = () => {
	const { user, logout } = useContext(AuthContext);

	const handleLogout = () => {
		logout();
	};

	return (
		<Container maxW="container.md">
			<Flex py="10" justifyContent="space-between" alignItems="center">
				<Text fontSize="2xl">¡Bienvenido {user?.email}!</Text>
				<Button colorScheme="red" variant="outline" onClick={handleLogout}>
					Cerrar sesión
				</Button>
			</Flex>
			<UserInfo />
			<Chat />
			<ProductForm />
			<ListOfProducts />
			<Cart />
			<Orders />
		</Container>
	);
};
