import { Box, Flex ,Text } from "@chakra-ui/react"
import { BiSolidGridAlt } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { BsSuitHeart } from "react-icons/bs";



const ProfileTaps = () => {
  return <Flex
    w={"full"}
    justifyContent={"center"}
    gap={{base:4,sm:10}}
    textTransform={"uppercase"}
    fontWeight={"bold"}
    >
    <Flex borderTop={"1px solid white"}
    alignItems={"center"}
    p={3}
    gap={1}
    cursor={"pointer"}
    >
        <Box 
        
        fontSize={20}>

<BiSolidGridAlt />
        </Box>
   
    <Text fontSize={12} display={{base:"none", sm:"block"}}>
        Posts
    </Text>

    </Flex>

    <Flex borderTop={"1px solid white"}
    alignItems={"center"}
    p={3}
    gap={1}
    cursor={"pointer"}
    >
        <Box 
        
        fontSize={20}>

<CiBookmark />
        </Box>
   
    <Text fontSize={12} display={{base:"none", sm:"block"}}>
        saved
    </Text>

    </Flex>
    <Flex borderTop={"1px solid white"}
    alignItems={"center"}
    p={3}
    gap={1}
    cursor={"pointer"}
    >
        <Box 
        
        fontSize={20}>
<BsSuitHeart />
        </Box>
   
    <Text fontSize={12} display={{base:"none", sm:"block"}}>
    likes
    </Text>

    </Flex> 



  </Flex>;
};

export default ProfileTaps