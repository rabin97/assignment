import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Stack,
    Text
} from '@chakra-ui/react';
import { MultiSelect } from 'chakra-multiselect';
import data from "../assets/data.json";

interface FormData {
    customerName: string;
    [key: string]: any;
    products: { label: string; value: string }[];
}

interface SaleOrderFormProps {
    isOpen: boolean;
    onClose: () => void;
    defaultValues?: FormData;
}

const SaleOrderForm: React.FC<SaleOrderFormProps> = ({ isOpen, onClose, defaultValues }) => {
    const { control, handleSubmit, watch } = useForm<FormData>({ defaultValues });
    const [selectedProducts, setSelectedProducts] = useState<{ label: string; value: string }[]>([]);

    const products = watch("products", []);

    useEffect(() => {
        setSelectedProducts(products);
    }, [products]);

    const onSubmit: SubmitHandler<FormData> = (formData) => {
        console.log(formData);
        onClose();
    };

    const getSKUsForProduct = (productName: string) => {
        const product = data.find(item => item.name === productName);
        return product ? product.sku : [];
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create Sale Order</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl mb={4}>
                            <FormLabel>Customer Name</FormLabel>
                            <Controller
                                name="customerName"
                                control={control}
                                render={({ field }) => <Input {...field} />}
                            />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Products</FormLabel>
                            <Controller
                                name="products"
                                control={control}
                                render={({ field }) => (
                                    <MultiSelect
                                        padding={3}
                                        {...field}
                                        options={data.map(item => ({ label: item.name, value: item.name }))}
                                    />
                                )}
                            />
                        </FormControl>
                        {selectedProducts.length > 0 && (
                            <Accordion allowMultiple>
                                {selectedProducts.map((product) => (
                                    <AccordionItem key={product.value}>
                                        <AccordionButton>
                                            <Box flex="1" textAlign="left">
                                                {product.label}
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                        <AccordionPanel pb={4}>
                                            {getSKUsForProduct(product.label).map((sku, index) => (
                                                <Stack key={sku.id} mb={2} spacing={5}>
                                                    <Stack padding={2} mb={3} spacing={2} boxShadow={"lg"} >
                                                        <Stack direction={"row"} justifyContent={"space-between"}>
                                                            <Stack direction={"row"} spacing={2}>
                                                                <Text fontSize='md'>{index}</Text>
                                                                <Text fontSize='md'>SKU {sku.id}</Text>
                                                                <Text fontSize='md'>({sku.amount} {sku.unit})</Text>
                                                            </Stack>
                                                            <Text fontSize='md'>Rate:{sku.selling_price}</Text>
                                                        </Stack>
                                                        <Stack direction={"row"}>
                                                            <FormControl mb={4}>
                                                                <FormLabel>Sellign rate</FormLabel>
                                                                <Controller
                                                                    name={`totalItems_${sku.selling_price}`}
                                                                    control={control}
                                                                    render={({ field }) => <Input {...field} />}
                                                                />
                                                            </FormControl>
                                                            <FormControl mb={4}>
                                                                <FormLabel>Total Item</FormLabel>
                                                                <Controller
                                                                    name={`totalItems_${sku.quantity_in_inventory}`}
                                                                    control={control}
                                                                    render={({ field }) => <Input {...field} />}
                                                                />
                                                            </FormControl>
                                                        </Stack>
                                                        <Box width={"100%"} display={"flex"} justifyContent={"flex-end"}>
                                                            Remaining {sku.quantity_in_inventory}
                                                        </Box>
                                                    </Stack>
                                                </Stack>
                                            ))}
                                        </AccordionPanel>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        )}
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
                        Save
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SaleOrderForm;
