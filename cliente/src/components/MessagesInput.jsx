import { useState } from 'react';
import { Button, Flex, Input } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const NewMessage = ({ socket }) => {
	const [message, setMessage] = useState('');

	const { user } = useContext(AuthContext);

	const handleSendMessage = event => {
		event.preventDefault();
		socket.emit('message', {
			message,
			email: user.email,
			fyh: Date.now(),
			type: 'cliente',
		});
		setMessage('');
	};

	return (
		<form onSubmit={handleSendMessage}>
			<Flex gap="1">
				<Input
					size="sm"
					value={message}
					placeholder="Escribe tu mensaje..."
					onChange={({ target }) => setMessage(target.value)}
					isRequired
				/>
				<Button colorScheme="teal" size="sm" type="submit">
					Enviar
				</Button>
			</Flex>
		</form>
	);
};

export default NewMessage;
