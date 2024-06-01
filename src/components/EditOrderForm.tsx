import React from 'react';
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
} from '@chakra-ui/react';
import { MultiSelect } from 'chakra-multiselect';

// Define the shape of the form data
interface FormData {
    customerName: string;
    products: string[];
}

// Define the props for the component
interface EditOrderFormProps {
    isOpen: boolean;
    onClose: () => void;
    defaultValues: FormData;
}

const EditOrderForm: React.FC<EditOrderFormProps> = ({ isOpen, onClose, defaultValues }) => {
    const { control, handleSubmit } = useForm<FormData>({ defaultValues });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
        onClose();
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
                                render={({ field }) => <MultiSelect {...field} options={[]} />}
                            />
                        </FormControl>
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

export default EditOrderForm;
