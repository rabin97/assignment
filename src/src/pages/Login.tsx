
import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Center
} from '@chakra-ui/react';
import { useAppDispatch } from '../../Redux/hooks';
import users from "../../assets/user.json"
import { setUser } from '../../Redux/slices/userSlice';
import { useNavigate } from "react-router-dom"

interface LoginProps {
    onClose: () => void;
}


const Login: React.FC<LoginProps> = ({
    onClose

}) => {


    return (
        <Center width={"100vw"}>
            <Modal isOpen onClose={onClose}   >
                <ModalOverlay />
                <ModalContent pb={4}>
                    <ModalHeader textAlign={"center"}>Login</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <LoginForm />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Center >
    )
}

export default Login



const LoginForm = () => {
    const dispatch = useAppDispatch();
    const Navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Email:", email);

        const user = users.find(user => user.customer_profile.email === email);
        if (user && user.customer_profile.password === password) {
            dispatch(setUser(user));
            console.log("Password:", password);
            Navigate("/", { replace: true });

        }

    };

    return (
        <Box
            maxW="md"
            borderWidth="1px"
            borderRadius="lg"
            p={6}
            boxShadow="lg"
        >
            <form onSubmit={handleSubmit} >
                <Stack spacing={3} >
                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </FormControl>
                    <Button type="submit" mt={4} colorScheme="blue">
                        Login
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};
