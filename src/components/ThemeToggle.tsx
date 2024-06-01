import { useColorMode } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { setTheme } from '../Redux/slices/ThemeSlice';
import { Switch } from '@chakra-ui/react'

const ThemeToggle = () => {

    const dispatch = useAppDispatch()
    const theme = useAppSelector((state) => state.theme.theme)

    const { setColorMode } = useColorMode();


    const handleToggle = () => {
        dispatch(setTheme())
        setColorMode(theme)
    };

    return <Switch onChange={handleToggle} isChecked={theme === "light"} colorScheme='teal' size='lg' />
};

export default ThemeToggle;
