import { Avatar, Flex, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { timeAgo } from "../../urils/timeAgo"
import useuserProfileStore from "../../src/store/UserProfileStore"


const  Caption = ({post}) =>  {
    const userProfile = useuserProfileStore((state)=> state.userProfile);
  return (
    <Flex gap={4}>
   <Link to={`/${userProfile.username}`}>
     <Avatar src={userProfile.profilePicURL} name={userProfile.username}  size={"sm"}/>
     </Link>
            <Flex direction={"column"}>
              
            <Flex gap={2} alignItems={"center"}>
              <Link to={`/${userProfile.username}`}>
                <Text fontSize={12} fontWeight={"bold"}>
              {userProfile.username}
                </Text>
                </Link>

                <Text fontSize={14}>
            {post.caption}
                </Text>
                </Flex>
                <Text fontSize={12} color={"gray"}>
                  {timeAgo (post.createdAt)}
                </Text>
                 </Flex>
            </Flex>


  )
}

export default Caption