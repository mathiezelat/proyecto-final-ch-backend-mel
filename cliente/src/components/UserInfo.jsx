import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import services from '../services/users';
import { Box, Text, Image } from '@chakra-ui/react';

const UserInfo = () => {
	const [info, setInfo] = useState(null);
	const { user, token } = useContext(AuthContext);

	useEffect(() => {
		if (user && token) {
			services.getUserById(user.uid, token).then(UserInfo => {
				setInfo(UserInfo);
			});
		}
	}, [user, token]);

	return (
		<Box my="4">
			<Text fontSize="2xl" mb="1">
				Información del usuario
			</Text>
			{info ? (
				<Box>
					<Image
						mb="1"
						borderRadius="sm"
						boxSize="100px"
						src={info.foto}
						alt="foto del usuario"
					/>
					<Text>Nombre completo: {info.nombre}</Text>
					<Text>Edad: {info.edad}</Text>
					<Text>Dirección: {info.direccion}</Text>
					<Text>Número de teléfono: +{info.telefono}</Text>
				</Box>
			) : (
				<Text>No hay información del usuario</Text>
			)}
		</Box>
	);
};

export default UserInfo;
