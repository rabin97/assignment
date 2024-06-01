import React, { useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    HStack,
    Avatar,
    Text,
    Box,
    useColorModeValue,
} from '@chakra-ui/react';
import SaleOrderForm from './SaleOrderForm';
import ThemeToggle from './ThemeToggle';

// Define the type for a sale order
interface SaleOrder {
    id: number;
    customerName: string;
    price: number;
    lastModified: string;
}

// Example JSON data
const saleOrders: SaleOrder[] = [
    { id: 1, customerName: 'Spider', price: 100, lastModified: '24/5/2024 (11:07 PM)' },
    { id: 2, customerName: 'Spider', price: 210, lastModified: '24/5/2024 (11:30 PM)' },
];

const SaleOrdersTable: React.FC = () => {
    // Use theme-aware values for colors
    const bgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('black', 'white');
    const headerBgColor = useColorModeValue('gray.100', 'gray.700');
    const headerTextColor = useColorModeValue('black', 'white');

    const [open, setOpen] = useState<boolean>(false)

    const [orderTab, setOrderTab] = useState<"active" | "complete">("active")

    const toggleSwitchTab = () => {
        setOrderTab(orderTab === "active" ? "complete" : "active")
    }

    return (
        <Box p={5} bg={bgColor} color={textColor} borderRadius="md">
            <SaleOrderForm isOpen={open} onClose={() => setOpen(false)} />
            <HStack spacing={4} mb={4} justifyContent={"space-between"} paddingY={3}>
                <HStack spacing={4}>
                    <Button onClick={toggleSwitchTab} colorScheme="teal" variant={orderTab === "active" ? "solid" : "outline"} >Active Sale Orders</Button>
                    <Button onClick={toggleSwitchTab} colorScheme="teal" variant={orderTab === "complete" ? "solid" : "outline"}>Completed Sale Orders</Button>
                </HStack>
                <HStack>
                    <Button colorScheme="teal" onClick={() => setOpen(true)}>+ Sale Order</Button>
                    <ThemeToggle />
                </HStack>
            </HStack>
            <TableContainer>
                <Table variant="simple">
                    <Thead bg={headerBgColor}>
                        <Tr>
                            <Th color={headerTextColor}>ID</Th>
                            <Th color={headerTextColor}>Customer Name</Th>
                            <Th color={headerTextColor}>Price (₹)</Th>
                            <Th color={headerTextColor}>Last Modified</Th>
                            <Th color={headerTextColor}>Edit/View</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {saleOrders.map(order => (
                            <Tr key={order.id}>
                                <Td>{order.id}</Td>
                                <Td>
                                    <HStack>
                                        <Avatar size="sm" name={order.customerName} />
                                        <Text>{order.customerName}</Text>
                                    </HStack>
                                </Td>
                                <Td>₹ {order.price}</Td>
                                <Td>{order.lastModified}</Td>
                                <Td>
                                    <Button onClick={() => console.log(order)} size="lg" variant="" colorScheme="teal" >
                                        ...
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default SaleOrdersTable;
