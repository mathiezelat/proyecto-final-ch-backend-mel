import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link as LinkRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import {
    Input,
    Button,
    FormControl,
    Flex,
    Text,
    Container,
    Link,
    InputGroup,
    InputLeftAddon,
    FormHelperText
} from '@chakra-ui/react'

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [edad, setEdad] = useState('');
    const [telefono, setTelefono] = useState('');
    const [foto, setFoto] = useState('');

    const { signup } = useContext(AuthContext);
    
    let navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        toast.promise(signup({
            email, 
            password,
            confirmPassword,
            nombre,
            direccion,
            edad,
            telefono: '+54911' + telefono,
            foto,
        }), 
        {            
            pending: 'Registrando...',
            success: {
                render() {
                    navigate('/login');
                    return 'Registrado con éxito'
                },
            },
            error: {
                render({data: { response: { data: { errors: [ error ] } } }}) {
                    const { msg } = error;
                    return `Error al registrarse: ${msg}`
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
                <Text lineHeight="short" fontSize='4xl' mt="0" mb="4">
                    ¡Bienvenido a mi proyecto final de Programación Backend 🎉!
                </Text>
                <form onSubmit={handleSignup}>
                    <Text fontSize='3xl'>
                        Sign up
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
                    <FormControl mb='2'>
                        <Input
                            type="text"
                            value={nombre}
                            name="nombre"
                            placeholder="Nombre completo"
                            isRequired
                            onChange={({ target }) => setNombre(target.value)}
                        />
                    </FormControl>
                    <FormControl mb='2'>
                        <Input
                            type="text"
                            value={direccion}
                            name="direccion"
                            placeholder="Dirección"
                            isRequired
                            onChange={({ target }) => setDireccion(target.value)}
                        />
                    </FormControl>
                    <FormControl mb='2'>
                        <Input
                            type="number"
                            value={edad}
                            name="edad"
                            placeholder="Edad"
                            isRequired
                            onChange={({ target }) => setEdad(target.value)}
                        />
                    </FormControl>
                    <FormControl mb='2'>
                        <InputGroup>
                            <InputLeftAddon children='+54 9 11' />
                            <Input
                            type="tel"
                            value={telefono}
                            name="telefono"
                            placeholder="Número de télefono"
                            isRequired
                            onChange={({ target }) => setTelefono(target.value)}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl mb='5'>
                        <Input
                            type="text"
                            value={foto}
                            name="foto"
                            placeholder="URL de foto"
                            isRequired
                            onChange={({ target }) => setFoto(target.value)}
                        />
                    </FormControl>
                    <FormControl mb='2'>
                        <Input
                            type="password"
                            value={password}
                            name="password"
                            placeholder="Password"
                            isRequired
                            onChange={({ target }) => setPassword(target.value)}
                        />
                        <FormHelperText>La contraseña debe de tener más de 6 caracteres.</FormHelperText>
                    </FormControl>
                    <FormControl mb='5'>
                        <Input
                            type="password"
                            value={confirmPassword}
                            name="confirmPassword"
                            placeholder="Confirmar password"
                            isRequired
                            onChange={({ target }) => setConfirmPassword(target.value)}
                        />
                    </FormControl>
                    <Button colorScheme='teal' type='submit' w='full'>
                        Crear cuenta
                    </Button>
                </form>
                <Flex mt="5" mb="5" alignContent="center" justifyContent="center">
                    <Text>
                        ¿Ya tenés una cuenta? {" "}
                        <Link as={LinkRouter} to='/login' color='teal.500'>
                            Iniciar sesión
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

export default SignupForm;
