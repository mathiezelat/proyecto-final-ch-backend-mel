import React from 'react'
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import Messages from './Messages';
import NewMessage from './MessagesInput';

const HOST = process.env.NODE_ENV === 'production' ? 'https://ecommercer-ch-mel-proyecto-fin.herokuapp.com/' : 'http://localhost:8080/';

const Chat = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(HOST, {
            transports: ['websocket'],
            upgrade: false,
        });
        setSocket(newSocket);
        return () => newSocket.close();
    }, []);

    return (
        <Box my="4">
            <Text fontSize="2xl" mb="1" >
                Canal de chat general
            </Text>
            { socket ? (
                <Box>
                    <Messages socket={socket} />
                    <NewMessage socket={socket} />
                </Box>
            ) : (
                <Text>
                    No conectado
                </Text>
            )}
        </Box>
    )
}

export default Chat