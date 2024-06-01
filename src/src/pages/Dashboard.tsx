import { Container, Stack } from '@chakra-ui/react'
import SaleOrdersTable from '../../components/Table'

const Dashboard = () => {
    return (
        <Container maxW={"1536px"} className='size-full h-screen '>
            {/* <Stack spacing={0} direction={"row"} > */}
            <Stack width={"100%"} padding={3}  >


                <SaleOrdersTable />
                {/* </Stack> */}
            </Stack>
        </Container>
    )
}

export default Dashboard
