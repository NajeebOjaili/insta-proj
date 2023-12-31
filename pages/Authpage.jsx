import {  Container,Flex , Box, Image,VStack } from '@chakra-ui/react'
import AuthForm from '../component/AuthForm/AuthForm'
import InstagramIcon from '../component/AuthForm/InstagramIcon'




const Authpage = ( ) => {
    return (
        <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>

            <Container maxH={"container.md"} padding={0}>
                <Flex justifyContent={"center"} alignItems={'center'} gap={10}>
                    {/*left image */}
             <InstagramIcon/>
             {/*right side*/}
             <VStack spacing={4} align={"stretch"}>
                <AuthForm/>
                <Box textAlign={"center"}>GET THE APP</Box>
                <Flex gap={5} justifyContent={"center"}>
                <Image src='/playstore.png' h={10} alt='playstor logo' ></Image>
                <Image src='/microsoft.png' h={10} alt='microsoft logo' ></Image> 
                </Flex>
            </VStack>
                </Flex>
          
           
            </Container>
        </Flex>
    )
}

export default Authpage