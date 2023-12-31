import { Flex, VStack ,Text, Box} from "@chakra-ui/react"
import SuggestedHeader from "./SuggestedHeader"
import SuggestedUser from "./SuggestedUser"
import useGetSuggestedUser from "../../src/hooks/useGetSuggestedUser"


const SuggestedUsers =  ()=> {
  const {isLoading, SuggestedUsers} = useGetSuggestedUser();


  // OPTIONAL : RENDER LOADING SKELTON 
  if (isLoading) return null;

  return (
    <VStack py={8} px={6} gap={4}>
     <SuggestedHeader/>
    {SuggestedUsers.length !== 0 && (
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={12} fontWeight={"bold"} color={"gray"} >
              Suggested for you
          </Text>
          <Text fontSize={12} fontWeight={"bold"} color={"gray"} >
              See All
          </Text>
          
      </Flex>
)}

{SuggestedUsers.map((user) => (
 <SuggestedUser user={user} key={user.id}/>
))}

<Box fontSize={12} color={"gray"} mt={5}>
  &copy; 2023 Naprogramm
</Box>
</VStack>
  )
}

export default SuggestedUsers;