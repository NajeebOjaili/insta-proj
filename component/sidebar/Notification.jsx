import { Tooltip,  Box, Flex } from "@chakra-ui/react"


import { NotificationsLogo } from "../../assets/constants"

const Notification = () => {
  return (
    <Tooltip 
   
    hasArrow
    label={"Notification"}
    placement="right"
    ml={1}
    openDelay={500}
    display={{ base:'block', md:"none"}}
    
  >


 <Flex
     
      alignItems={"center"}
      gap={4}
      borderRadius={6}
      _hover={{ bg:"whiteAlpha.400"}}
      p={2}
      w={{ base:10,md:"full"}}
      justifyContent={{ base: "center",md:"flex-start" }}

       >
      
      <NotificationsLogo/>
      <Box display={{ base:"none",md:"block"}}>Notification</Box>
      </Flex>

            </Tooltip>
  )
}

export default Notification