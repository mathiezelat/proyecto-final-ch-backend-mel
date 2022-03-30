import { useState, useContext } from 'react';
import { Text, Box, FormControl, Input, Button } from '@chakra-ui/react';
import { ProductContext } from './../context/ProductContext';
import { ToastContainer, toast } from 'react-toastify';

const ProductForm = () => {
	const [nombre, setNombre] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [categoria, setCategoria] = useState('');
	const [foto, setFoto] = useState('');
	const [precio, setPrecio] = useState('');
	const [stock, setStock] = useState('');
	const [codigo, setCodigo] = useState('');

	const { createProduct } = useContext(ProductContext);

	const handleCreateProduct = async event => {
		event.preventDefault();

		toast.promise(
			createProduct({
				nombre,
				descripcion,
				categoria,
				foto,
				precio,
				stock,
				codigo,
			}),
			{
				pending: 'Ingresando producto...',
				success: {
					render() {
						setNombre('');
						setDescripcion('');
						setCategoria('');
						setFoto('');
						setPrecio('');
						setStock('');
						setCodigo('');
						return 'Producto ingresado con éxito';
					},
				},
				error: {
					render({
						data: {
							response: {
								data: {
									errors: [error],
								},
							},
						},
					}) {
						const { msg } = error;
						return `Error al ingresar el producto: ${msg}`;
					},
				},
			},
			{
				position: 'bottom-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			}
		);
	};

	return (
		<Box my="4">
			<Text fontSize="2xl" mb="1">
				Ingrese producto
			</Text>
			<form onSubmit={handleCreateProduct}>
				<FormControl mt="1" mb="2">
					<Input
						type="text"
						value={nombre}
						name="nombre"
						placeholder="Nombre del producto"
						isRequired
						onChange={({ target }) => setNombre(target.value)}
					/>
				</FormControl>
				<FormControl mb="2">
					<Input
						type="text"
						value={descripcion}
						name="descripcion"
						placeholder="Descripción del producto"
						isRequired
						onChange={({ target }) => setDescripcion(target.value)}
					/>
				</FormControl>
				<FormControl mb="2">
					<Input
						type="text"
						value={categoria}
						name="categoria"
						placeholder="Categoría del producto"
						isRequired
						onChange={({ target }) => setCategoria(target.value)}
					/>
				</FormControl>
				<FormControl mb="4">
					<Input
						type="text"
						value={foto}
						name="foto"
						placeholder="Foto URL del producto"
						isRequired
						onChange={({ target }) => setFoto(target.value)}
					/>
				</FormControl>
				<FormControl mb="2">
					<Input
						type="number"
						value={precio}
						name="precio"
						placeholder="Precio del producto"
						isRequired
						onChange={({ target }) => setPrecio(target.value)}
					/>
				</FormControl>
				<FormControl mb="2">
					<Input
						type="number"
						value={stock}
						name="stock"
						placeholder="Stock del producto"
						isRequired
						onChange={({ target }) => setStock(target.value)}
					/>
				</FormControl>
				<FormControl mb="5">
					<Input
						type="number"
						value={codigo}
						name="codigo"
						placeholder="Código del producto"
						isRequired
						onChange={({ target }) => setCodigo(target.value)}
					/>
				</FormControl>
				<Button colorScheme="teal" type="submit" w="full">
					Enviar
				</Button>
			</form>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</Box>
	);
};

export default ProductForm;
