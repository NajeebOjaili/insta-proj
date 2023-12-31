import { Avatar, AvatarGroup, Text, Flex, VStack, Button, useDisclosure } from "@chakra-ui/react";
import useuserProfileStore from "../../src/store/UserProfileStore";
import useAuthStore from "../../src/store/authStore"
import EditProfile from "./EditProfile";
import useFollowUser from "../../src/hooks/useFollowUser";





const ProfileHeader = () =>{
  const { userProfile } = useuserProfileStore ();
  const authUser = useAuthStore(state => state.user);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid);
  const visitinOwnProfilAndAuth = authUser && authUser.username === userProfile.username;
  const visitinAnotherProfilAndAuth = authUser && authUser.username !== userProfile.username;
   return (
   <Flex 
   gap={{base:4, sm:10}}
   py={10}
   direction={{base:"column", sm:"row"}}   
   >
    <AvatarGroup 
    size={{base:"xl",md:"2xl"}}
    justifySelf={"center"}
  alignSelf={"flex-start"} 
 mx={"auto"}

    >

<Avatar name = {userProfile.username}
 src={userProfile.profilePicURL} alt='PROFILEPIC' />
 </AvatarGroup>
 <VStack alignItems={"start"}
 gap={2}
 flex={1}
 mx={"auto"}>
<Flex 
gap={4}
direction={{base:"column", sm:"row"}}
justifyContent={{base:"center", sm:"flex-start"}}
alignItems={"center"}
w={"full"}
>
    <Text fontSize={{base:"sm", md:"lg"}}>
       {userProfile.username}
    </Text>
    {visitinOwnProfilAndAuth && (  <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
          <Button
            bg={"white"}
            color={"black"}
            _hover={{ bg: "whiteAlpha.800" }}
            size={{ base: "xm", md: "sm" }}
            onClick={onOpen}
          >
            Edit profile
          </Button>
        </Flex>)}
    {visitinAnotherProfilAndAuth && ( <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
        <Button bg={"blue.500"} color={"white"} _hover={{bg:"blue.600"}} size={{base:"xm" ,md:"sm"}}
        onClick={handleFollowUser}
        isLoading= {isUpdating}
        >

       {isFollowing ? "Unfollow": "Follow"}
        </Button>

    </Flex>)}
    
   </Flex>

   <Flex alignItems={"center"} gap={{base:2,sm:4}}>

<Text fontSize={{base:"xs",md:"sm"}}>
    <Text as={"span"} fontWeight={"bold"} mr={1}>
     {userProfile.Posts.length}
        </Text>
    Posts
</Text>
<Text  fontSize={{base:"xs",md:"sm"}}>
    <Text as={"span"} fontWeight={"bold"} mr={1}>
    {userProfile.followers.length}
        </Text>
   Followers
</Text>
<Text  fontSize={{base:"xs",md:"sm"}}>
    <Text as={"span"} fontWeight={"bold"} mr={1}>
    {userProfile.following.length}
        </Text>
    Following
</Text>
</Flex>
<Flex alignItems={"center"} gap={4}>
    <Text fontSize={"sm"} fontWeight={"bold"}>
      {userProfile.fullname}
    </Text>
 </Flex>
 <Text fontSize={"sm"}> {userProfile.bio}</Text>



 </VStack>
 {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />} 

</Flex>
  )
}

export default ProfileHeader;