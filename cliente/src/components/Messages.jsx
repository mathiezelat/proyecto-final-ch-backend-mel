import { useEffect, useState, useRef } from 'react';
import { Flex, Text, Box } from '@chakra-ui/react';

const ItemMessage = (({message}) => (
    <Box w="full">
        <Text minW="xs" maxW="2xl">
            <Box pr="1" as="span">
                {">"}
            </Box>
            <Box as="span" fontWeight="light" fontFamily="monospace" opacity="0.55" >
                {new Date(message.timestamp).toLocaleTimeString()}
            </Box>
            <Box pl="1" color={`${(message.type === 'sistema') ? 'slateblue' : 'twitter.500'}`} as="span" >
                {message.email}
            </Box>:
            <Box px="1" as="span" >
                {message.message}
            </Box>
        </Text>
    </Box>
));

const ListOfMessages = (({messages}) => (
    messages.map((message) => <ItemMessage key={message.id} message={message} />) 
));

const Messages = ({ socket }) => {
    const [messages, setMessages] = useState([]);
    const messagesRef = useRef(null);

    useEffect(() => {
        const messagesListener = (message) => {
            setMessages((prevMessages) => {
                const newMessages = [...prevMessages];
                newMessages.push(message);
                return newMessages;
            });
        };

        socket.on('message', messagesListener);

        socket.on('messages', (messages) => {
            setMessages(messages);
        });

        socket.emit('getMessages');

        return () => {
            socket.off('message', messagesListener);
        };
    }, [socket]);

    useEffect(() => {
        if(messagesRef) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight
        }
    }, [messages])

    return (
        <Flex 
            ref={messagesRef}
            p="2"
            mb="1" 
            flexDirection="column"
            bgColor="blackAlpha.50"
            borderRadius="md"
            h="xs"
            w="full"
            overflowY="scroll"
            overflowX="clip"
            bottom="0"
        >
            <ListOfMessages messages={messages} />
        </Flex>
    )
}

export default Messages