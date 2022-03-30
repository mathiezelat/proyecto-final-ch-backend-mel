import { useContext } from 'react';
import { OrderContext } from './../context/OrderContext';
import { Box, Text, Flex, Table, Tr, Th, Thead, Tbody, Td, TableCaption } from '@chakra-ui/react';

const ItemProduct = ({product}) => (
    <Tr>
        <Td>
            {product.nombre}
        </Td>
        <Td isNumeric>
            ${product.precio}
        </Td>
        <Td isNumeric>
            x{product.cantidad}
        </Td>
    </Tr>
)

const ItemOrder = ({order}) => (
    <Box border="1px" borderColor="blackAlpha.300" borderRadius="md" p="2">
        <Flex mb="2" px="4" w="full" justifyContent="space-between">
            <Text>
                Orden {order.orderNumber}
            </Text>
            <Text>
                {new Date(order.timestamp).toLocaleString()}
            </Text>
        </Flex>
        <Flex flexDirection="column">
            <Table size='sm' variant='simple' >
            <TableCaption>
                Total: ${order.items.reduce((acc, curr) => {return acc + curr.precio * curr.cantidad}, 0)}
            </TableCaption>
            <Thead>
                <Tr>
                    <Th>Nombre</Th>
                    <Th isNumeric>Precio</Th>
                    <Th isNumeric>Cantidad</Th>
                </Tr>
            </Thead>
            <Tbody>
                {order.items.map((item) => <ItemProduct key={item.id} product={item} />)}
            </Tbody>
            </Table>
        </Flex>
    </Box>
)

const ListOfOrders = ({orders}) => (
    <Flex flexDirection="column" gap="2" w="full" border="1px" borderRadius="sm" borderColor="blackAlpha.50" p="2">
        {orders.map((order) => <ItemOrder key={order.id} order={order} />)}
    </Flex>
)

const Orders = () => {
    const { orders } = useContext(OrderContext);

    return (
        <Box my="4">
            <Text fontSize="2xl" mb="1" >
                Ordenes
            </Text>
            { 
                (orders.length !== 0)
                    ?
                        <ListOfOrders orders={orders} />
                    :
                    <Text>
                        No tienes ordenes
                    </Text>
            }
        </Box>
    )
}

export default Orders