import { useState, useContext } from 'react';
import { useNavigate, Link as LinkRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Input,
    Button,
    FormControl,
    Flex,
    Text,
    Container,
    Link
} from '@chakra-ui/react'

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useContext(AuthContext);
    
    let navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        toast.promise(login({email, password}), 
        {            
            pending: 'Iniciando sesión...',
            success: {
                render() {
                    navigate('/');
                    return 'Inicio de sesión con éxito'
                },
            },
            error: {
                render({data: { response: { data: { errors: [ error ] } } }}) {
                    const { msg } = error;
                    return `Error al iniciar sesión: ${msg}`
                }
            }
        },
        {
            position: "bottom-right",
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
        <Container>
            <Flex minH='100vh' flexDirection='column' justifyContent="center">
                <Text lineHeight="short" fontSize='4xl' mt="-36" mb="5">
                    ¡Bienvenido a mi proyecto final de Programación Backend 🎉!
                </Text>
                <form onSubmit={handleLogin}>
                    <Text fontSize='3xl'>
                        Log in
                    </Text>
                    <FormControl mt='1' mb='2'>
                        <Input
                            type="email"
                            value={email}
                            name="email"
                            placeholder="Email"
                            isRequired
                            onChange={({ target }) => setEmail(target.value)}
                        />
                    </FormControl>
                    <FormControl mb='5'>
                        <Input
                            type="password"
                            value={password}
                            name="password"
                            placeholder="Password"
                            isRequired
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </FormControl>
                    <Button colorScheme='teal' type='submit' w='full'>
                        Iniciar sesión
                    </Button>
                </form>
                <Flex mt="5" alignContent="center" justifyContent="center">
                    <Text>
                        ¿No tenés una cuenta? {" "}
                        <Link as={LinkRouter} to='/signup' color='teal.500'>
                            Registrarse
                        </Link>
                    </Text>
                </Flex>
            </Flex>
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
        </Container>
    );
};

export default LoginForm;
