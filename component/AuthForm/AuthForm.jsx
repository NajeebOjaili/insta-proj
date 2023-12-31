import { Box, VStack ,Image,Flex ,Text } from "@chakra-ui/react"
import { useState } from "react"
import Signup from "./Signup";
import Login from "./Login";
import GoogleAuth from "./GoogleAuth";



function AuthForm() {
    const [isLogin , setIsLogin] = useState(true);
    
   
  return (
   <>
   <Box border={"1px solid grey"} borderRadius={4} padding={5}>
   <VStack spacing={4}>
   <Image src="logo.png" h={24} cursor={"pointer"}></Image>
  

   {isLogin ? <Login/> : <Signup/>}



 { /*===================================== OR TEXT ===================*/}
   <Flex alignItems={"center"} justifyContent={"center"} gap={1} my={4} w={"full"}>
    <Box flex={2} h={"1px"} bg={"gray.400"}/>
    <Text mx={1} color={"white"}> OR</Text>
    <Box flex={2} h={"1px"} bg={"gray.400"}/>
    
</Flex>
<GoogleAuth  prefix={isLogin ? "Log in" : "Sign up"}/>
   </VStack>
   </Box>

   <Box  border={"1px solid gray "} w={300} borderRadius={4} padding={5}>
    <Flex  alignItems={"center"}justifyContent={"center"} gap={10} >
        <Box mx={-8} fontSize={14}>
            {isLogin ? "Don't have an account?": "Already have an account?"}
        </Box>
        <Box onClick={() => setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
            {isLogin ? "  Sign up " : "Log in"}
        </Box>

    </Flex>
   </Box>
   </>
  )
}

export default AuthForm