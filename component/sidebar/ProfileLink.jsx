import { Avatar, Tooltip ,Link, Box } from "@chakra-ui/react";
import useAuthStore from "../../src/store/authStore";
import { Link as RouterLink } from "react-router-dom";


const ProfileLink  = () => {
    const authuser = useAuthStore((state) => state.user);
  return (
    <Tooltip 
  
    hasArrow
    label={"Profile"}
    placement="right"
    ml={1}
    openDelay={500}
    display={{ base:'block', md:"none"}}
    
  >


     <Link 
     display={"flex"}
      to={`/${authuser?.username}`}
      as={RouterLink}
      alignItems={"center"}
      gap={4}
      borderRadius={10}
      _hover={{ bg:"whiteAlpha.400"}}
      p={2}
      w={{ base:10,md:"full"}}
      justifyContent={{ base: "center",md:"flex-start" }}

       >
      
     <Avatar size={"sm"} src={authuser?.profilePicURL || ""} />
      <Box display={{ base:"none",md:"block"}}>Profile</Box>
      </Link>

            </Tooltip>

  );
};

export default ProfileLink;